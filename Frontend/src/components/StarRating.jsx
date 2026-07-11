import { Star } from 'lucide-react';

export default function StarRating({ rating, max = 5 }) {
  return (
    <span className="inline-flex items-center gap-0.5" title={`${rating}/${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={11}
          className={i < rating ? 'text-yellow-400/90 fill-yellow-400/90' : 'text-surface-600'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
