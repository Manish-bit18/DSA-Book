import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-950 flex flex-col items-center justify-center px-4">
      <div className="p-3 rounded-2xl bg-accent-500/[0.06] ring-1 ring-accent-500/20 mb-5">
        <BookOpen size={36} className="text-accent-400" />
      </div>
      <h1 className="text-4xl font-bold text-surface-100 tracking-tight mb-2">404</h1>
      <p className="text-surface-400 text-sm mb-6">This page is not part of the Dsa Book.</p>
      <Link to="/">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </div>
  );
}
