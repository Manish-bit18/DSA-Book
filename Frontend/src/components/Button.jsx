export default function Button({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-accent-500 text-white hover:bg-accent-400 active:bg-accent-600',
    secondary: 'bg-surface-800 text-surface-200 border border-surface-700 hover:bg-surface-700 hover:text-surface-100',
    ghost: 'text-surface-400 hover:text-surface-100 hover:bg-surface-800',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  );
}
