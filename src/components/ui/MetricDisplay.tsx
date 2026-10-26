import React from 'react';

interface MetricDisplayProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
  label,
  value,
  subValue,
  trend = 'neutral',
  className = ''
}) => {
  const trendColors = {
    positive: 'text-emerald-400',
    negative: 'text-rose-400',
    neutral: 'text-slate-400',
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold ${trendColors[trend]}`}>{value}</span>
        {subValue && <span className="text-xs text-slate-400">{subValue}</span>}
      </div>
    </div>
  );
};
