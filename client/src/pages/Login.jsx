import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Welcome back</h3>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
              placeholder="admin@prime.ai"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer" />
            <label className="ml-2 block text-sm text-slate-600">Remember me</label>
          </div>
          <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">Forgot password?</a>
        </div>
        <Button fullWidth type="submit" className="mt-6 flex items-center justify-center gap-2">
          Sign In <ArrowRight size={18} />
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
