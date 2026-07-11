import { AlertTriangle } from 'lucide-react';
import Button from './Button';

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20 mb-4">
        <AlertTriangle size={28} className="text-red-400" />
      </div>
      <p className="text-sm font-medium text-surface-300">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" className="mt-4">
          Try Again
        </Button>
      )}
    </div>
  );
}
