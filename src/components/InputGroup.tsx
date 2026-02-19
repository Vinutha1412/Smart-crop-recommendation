import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputGroupProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
  unit: string;
  min?: number;
  max?: number;
  step?: number;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  unit,
  min = 0,
  max = 1000,
  step = 1,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wider text-brand-700 flex items-center gap-2">
        <Icon size={14} className="text-accent-600" />
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          className="w-full bg-white/50 border border-brand-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all text-brand-900 font-medium"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-brand-400">
          {unit}
        </span>
      </div>
    </div>
  );
};
