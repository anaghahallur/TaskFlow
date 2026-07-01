import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-200/50 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-200/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-blue-100/50 blur-[120px]" />
      </div>
      
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-indigo-500/30">
              P
            </div>
            PrimePanel
          </h2>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel py-10 px-6 sm:rounded-3xl sm:px-12 relative"
        >
          {/* Subtle inner border for premium glass look */}
          <div className="absolute inset-0 rounded-3xl border border-white/60 pointer-events-none" />
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
