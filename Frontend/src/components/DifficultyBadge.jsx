import { DIFFICULTY_COLORS } from '../utils/constants';

export default function DifficultyBadge({ difficulty }) {
  const key = difficulty?.toLowerCase();
  const colorClass = DIFFICULTY_COLORS[key] || DIFFICULTY_COLORS.easy;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md border ${colorClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        key === 'easy' ? 'bg-green-400' :
        key === 'medium' ? 'bg-yellow-400' :
        key === 'hard' ? 'bg-red-400' : 'bg-surface-400'
      }`} />
      {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
    </span>
  );
}
