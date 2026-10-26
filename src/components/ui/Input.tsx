import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export const Input: React.FC<InputProps> = ({ label, description, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <input
        {...props}
        className="px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-500"
      />
      {description && <p className="text-xs text-slate-400">{description}</p>}
    </div>
  );
};
