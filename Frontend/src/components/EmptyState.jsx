import { SearchX } from 'lucide-react';

export default function EmptyState({ title = 'No results found', description = 'Try adjusting your search or filters.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="p-3 rounded-xl bg-surface-800/60 border border-surface-700/60 mb-4">
        <SearchX size={28} className="text-surface-500" />
      </div>
      <p className="text-sm font-medium text-surface-300">{title}</p>
      <p className="text-xs text-surface-500 mt-1 max-w-xs text-center">{description}</p>
    </div>
  );
}
