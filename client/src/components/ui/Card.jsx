import React from 'react';

const Card = ({ children, className = '', hover = false }) => {
  return (
    <div 
      className={`
        bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm
        ${hover ? 'transition-all duration-300 hover:shadow-md hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
