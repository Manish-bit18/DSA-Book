import { Link } from 'react-router-dom';
import { ChevronLeft, Menu, Sun, Moon } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ title, subtitle, backPath }) {
  const { setIsOpen } = useSidebar();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-surface-950/80 backdrop-blur-sm border-b border-surface-800/50">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-1.5 -ml-1.5 rounded-lg text-surface-400 hover:text-surface-100 hover:bg-surface-800 transition-all"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        {backPath && (
          <Link
            to={backPath}
            className="p-1.5 -ml-1.5 rounded-lg text-surface-400 hover:text-surface-100 hover:bg-surface-800 transition-all"
          >
            <ChevronLeft size={20} />
          </Link>
        )}
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-surface-100 truncate tracking-tight">
            {title || 'Dsa Book'}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-surface-400 truncate">{subtitle}</p>
          )}
        </div>
        <div className="ml-auto flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
