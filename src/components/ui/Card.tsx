import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-6 rounded-xl border shadow-sm ${className}`}>
      {children}
    </div>
  );
};
