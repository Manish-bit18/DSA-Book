import { ChevronDown } from 'lucide-react';

export default function FilterDropdown({ label, value, options, onChange, placeholder = 'All' }) {
  return (
    <div className="relative group">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full min-w-[120px] pl-3 pr-8 py-2 text-sm bg-surface-900/80 border border-surface-700/80 rounded-lg text-surface-100 focus:outline-none focus:border-accent-500/40 focus:ring-1 focus:ring-accent-500/15 transition-all cursor-pointer hover:border-surface-600"
      >
        <option value="" className="text-surface-400">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-surface-100">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none group-hover:text-surface-300 transition-colors" />
    </div>
  );
}
