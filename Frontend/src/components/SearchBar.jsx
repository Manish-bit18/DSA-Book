import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search problems...' }) {
  return (
    <div className="relative group">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 group-focus-within:text-accent-400 transition-colors" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-sm bg-surface-900/80 border border-surface-700/80 rounded-lg text-surface-100 placeholder-surface-500 focus:outline-none focus:border-accent-500/40 focus:ring-1 focus:ring-accent-500/15 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-100 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
