import React, { useState, useEffect } from 'react';
import { Search, Shield, ShieldOff, Trash2, User as UserIcon } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Users = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleRole = async (id, currentRole) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      await api.put(`/users/${id}/role`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update role');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This cannot be undone.')) {
      try {
        await api.delete(`/users/${id}`);
        toast.success('User deleted');
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-sm text-slate-500">Manage your platform users and roles</p>
        </div>
      </div>

      <Card noPadding>
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 rounded-t-2xl">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500 font-medium">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Joined Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                        alt="avatar" 
                        className="w-10 h-10 rounded-full bg-slate-100"
                      />
                      {user.name}
                      {user._id === currentUser?._id && (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleToggleRole(user._id, user.role)}
                        title={user.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                        className={`p-1.5 rounded-lg transition-colors ${
                          user.role === 'admin' 
                            ? 'text-purple-500 hover:bg-purple-50' 
                            : 'text-slate-400 hover:text-indigo-500 hover:bg-indigo-50'
                        }`}
                      >
                        {user.role === 'admin' ? <ShieldOff size={16} /> : <Shield size={16} />}
                      </button>
                      <button 
                        onClick={() => handleDelete(user._id)}
                        disabled={user._id === currentUser?._id}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && !loading && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <div>Showing {filteredUsers.length} users</div>
        </div>
      </Card>
    </div>
  );
};

export default Users;
