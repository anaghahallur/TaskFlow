import React from 'react';

const Input = React.forwardRef(({ label, id, error, className = '', ...props }, ref) => {
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700 ">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`flex h-11 w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50    :text-slate-500 transition-shadow ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300'
        }`}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
