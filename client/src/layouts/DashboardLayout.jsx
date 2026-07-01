import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: ShoppingBag },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        className={`fixed lg:sticky top-0 left-0 z-30 h-screen w-[280px] bg-[#0B1120] text-slate-300 flex flex-col transition-transform duration-300 ${isOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
              P
            </div>
            <span className="text-xl font-bold text-white tracking-tight">PrimePanel</span>
          </div>
          <button 
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
            Main Menu
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20 font-medium'
                    : 'hover:bg-slate-800/50 hover:text-white'
                }`
              }
            >
              <item.icon size={20} className="opacity-80 group-hover:opacity-100" />
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* User Profile widget at bottom */}
        <div className="p-4 border-t border-slate-800/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/50">
            <img 
              src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} 
              alt="User avatar" 
              className="w-10 h-10 rounded-full bg-slate-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email || 'user@example.com'}</p>
            </div>
            <button onClick={logout} className="p-1 hover:bg-slate-700 rounded-md transition-colors">
              <LogOut size={18} className="text-slate-400 hover:text-red-400" />
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans selection:bg-indigo-500/30">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            {/* Global Search */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all w-80">
              <span className="text-slate-400">⌘K</span>
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none focus:outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full text-slate-500 hover:bg-slate-200 relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-50"></span>
            </button>
            <Link 
              to="/products"
              className="hidden sm:flex items-center justify-center h-10 px-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5"
            >
              <Plus size={16} className="mr-2" /> Add Product
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto w-full"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
