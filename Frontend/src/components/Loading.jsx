import { Loader2 } from 'lucide-react';

export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="p-2.5 rounded-full bg-accent-500/5 mb-4">
        <Loader2 size={22} className="text-accent-400 animate-spin" />
      </div>
      <p className="text-sm text-surface-400 font-medium">{message}</p>
    </div>
  );
}
