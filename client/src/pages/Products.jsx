import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Package } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('Status: All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Electronics',
    description: '',
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      setProducts(res.data.products);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const uniqueCategories = ['All Categories', ...Array.from(new Set(products.map(p => p.category)))];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', stock: '', category: 'Electronics', description: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, formData);
        toast.success('Product updated successfully');
      } else {
        await api.post('/products', formData);
        toast.success('Product added successfully');
      }
      setIsModalOpen(false);
      setFormData({ name: '', price: '', stock: '', category: 'Electronics', description: '' });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    }
  };

  const confirmDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-slate-900">Are you sure you want to delete this product?</p>
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t.id)}>Cancel</Button>
          <Button 
            size="sm" 
            className="bg-red-500 hover:bg-red-600 text-white border-0" 
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    ), { duration: Infinity, style: { minWidth: '300px' } });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 ">Products</h1>
          <p className="text-sm text-slate-500 ">Manage your store products</p>
        </div>
        <Button onClick={openAddModal} className="w-full sm:w-auto flex items-center gap-2">
          <Plus size={18} /> Add Product
        </Button>
      </div>

      <Card noPadding>
        <div className="p-4 border-b border-slate-200  flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50  rounded-t-2xl">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-white  border border-slate-200  rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white  border border-slate-200  text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white  border border-slate-200  text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Status: All</option>
              <option>Active</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200  text-sm text-slate-500  font-medium">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Stock</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {products
                .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .filter(p => selectedCategory === 'All Categories' || p.category === selectedCategory)
                .filter(p => selectedStatus === 'Status: All' || p.status === selectedStatus.replace('Status: ', ''))
                .map((product) => (
                <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Package size={20} className="text-slate-400" />
                      </div>
                      {product.name}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500">{product.category}</td>
                  <td className="py-4 px-6 font-medium">${product.price.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <span className={`${product.stock > 10 ? 'text-emerald-500' : product.stock > 0 ? 'text-amber-500' : 'text-red-500'}`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(product)} className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => confirmDelete(product._id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && !loading && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">No products found. Add one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <div>Showing {products.length} results</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Product" : "Add New Product"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Product Name" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter product name" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price" name="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleInputChange} required placeholder="0.00" />
            <Input label="Stock" name="stock" type="number" min="0" value={formData.stock} onChange={handleInputChange} required placeholder="0" />
          </div>
          <Input label="Category" name="category" value={formData.category} onChange={handleInputChange} required placeholder="e.g. Electronics" />
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="flex min-h-[100px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product description"
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Product</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Products;
