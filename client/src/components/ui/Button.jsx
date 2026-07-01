import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md shadow-indigo-200 ',
    secondary: 'bg-purple-100 text-purple-700 hover:bg-purple-200 focus:ring-purple-500   :bg-purple-800/40',
    outline: 'border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700 focus:ring-indigo-500   :bg-slate-800',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-500  :bg-slate-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md shadow-red-200 ',
  };

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
    icon: 'h-10 w-10 p-2',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
