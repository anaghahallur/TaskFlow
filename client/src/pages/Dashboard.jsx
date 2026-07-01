import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Layers, AlertCircle, DollarSign, TrendingUp, Package } from 'lucide-react';
import Card from '../components/ui/Card';
import api from '../utils/api';

const COLORS = ['#4F46E5', '#8B5CF6', '#EC4899', '#F43F5E', '#10B981', '#F59E0B'];

const StatCard = ({ title, value, icon: Icon, trend, positive }) => (
  <Card hover className="flex flex-col bg-white">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${positive ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-100 text-rose-600'}`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${positive ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend}
        <TrendingUp size={16} className={positive ? '' : 'rotate-180'} />
      </div>
    </div>
    <div>
      <h4 className="text-slate-500 text-sm font-medium mb-1">{title}</h4>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  </Card>
);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data.products);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Compute stats dynamically
  const totalProducts = products.length;
  const inventoryValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const lowStock = products.filter(p => p.stock < 10).length;
  
  // Create pie data dynamically based on categories
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  
  const totalCategories = Object.keys(categoryCounts).length;

  const dynamicPieData = Object.keys(categoryCounts).map(key => ({
    name: key, value: categoryCounts[key]
  }));
  if (dynamicPieData.length === 0) dynamicPieData.push({ name: 'Empty', value: 1 });

  // Create Bar chart data (Top 7 products by stock)
  const barData = [...products]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 7)
    .map(p => ({
      name: p.name.length > 10 ? p.name.substring(0, 10) + '...' : p.name,
      stock: p.stock
    }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Overview 👋</h1>
        <p className="text-slate-500">Here's what's happening with your store today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Inventory Value" value={`$${inventoryValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={DollarSign} trend="Real-time" positive />
        <StatCard title="Total Products" value={loading ? '...' : totalProducts} icon={Package} trend="Live count" positive />
        <StatCard title="Categories" value={loading ? '...' : totalCategories} icon={Layers} trend="Real-time" positive />
        <StatCard title="Low Stock Alerts" value={loading ? '...' : lowStock} icon={AlertCircle} trend="Needs action" positive={lowStock === 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Top Products by Stock</h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dx={-10} />
                <RechartsTooltip 
                  cursor={{ fill: '#F1F5F9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#4F46E5', fontWeight: 600 }}
                />
                <Bar dataKey="stock" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-white">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Products by Category</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dynamicPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {dynamicPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {dynamicPieData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
