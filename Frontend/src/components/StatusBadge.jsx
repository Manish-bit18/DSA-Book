import { STATUS, STATUS_COLORS } from '../utils/constants';

const statusOptions = [
  { value: STATUS.NOT_STARTED, label: 'Not Started' },
  { value: STATUS.ATTEMPTING, label: 'Attempting' },
  { value: STATUS.SOLVED, label: 'Solved' },
];

export default function StatusBadge({ status, onChange }) {
  const colorClass = STATUS_COLORS[status] || STATUS_COLORS.NOT_STARTED;

  const handleClick = () => {
    if (!onChange) return;
    const currentIndex = statusOptions.findIndex((s) => s.value === status);
    const nextIndex = (currentIndex + 1) % statusOptions.length;
    onChange(statusOptions[nextIndex].value);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-all cursor-pointer hover:scale-105 active:scale-95 ${colorClass}`}
      title="Click to cycle: Not Started → Attempting → Solved"
    >
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'SOLVED' ? 'bg-green-400 shadow-[0_0_4px_rgba(34,197,94,0.4)]' :
        status === 'ATTEMPTING' ? 'bg-yellow-400 shadow-[0_0_4px_rgba(234,179,8,0.4)]' :
        'bg-surface-400'
      }`} />
      {status === 'NOT_STARTED' ? 'Not Started' :
       status === 'ATTEMPTING' ? 'Attempting' : 'Solved'}
    </button>
  );
}
