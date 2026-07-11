import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutList, Type, Link2, SquareStack, Container, Hash,
  Search, Repeat, GitBranch, GitFork, GitPullRequest,
  Layers, Share2, Zap, Cpu, TreePine, Binary, Home, Settings,
  X, BookOpen, Sigma, Wrench, Sparkles, Sun, Moon,
} from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import { useTheme } from '../context/ThemeContext';
import { getChapters } from '../services/apiService';

const iconMap = {
  LayoutList, Type, Link2, SquareStack, Container, Hash,
  Search, Repeat, GitBranch, GitFork, GitPullRequest,
  Layers, Share2, Zap, Cpu, TreePine, Binary,
  Sigma, Wrench, Sparkles,
};

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    getChapters().then(setChapters).catch(() => {});
  }, []);

  const sidebarLinks = [
    { id: 'home', label: 'Home', path: '/', icon: Home, section: 'main' },
    ...chapters.map((ch) => ({
      id: ch.id,
      label: ch.title,
      path: `/chapter/${ch.id}`,
      icon: iconMap[ch.icon] || BookOpen,
      section: 'chapters',
    })),
    { id: 'search', label: 'Search', path: '/search', icon: Search, section: 'utilities' },
    { id: 'settings', label: 'Settings', path: '/settings', icon: Settings, section: 'utilities' },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-surface-900 border-r border-surface-800 overflow-y-auto lg:hidden"
          >
            <div className="p-4 flex items-center justify-between border-b border-surface-800">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-accent-500/10">
                  <BookOpen size={18} className="text-accent-400" />
                </div>
                <span className="font-bold text-surface-100 text-sm">Dsa Book</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-surface-400 hover:text-surface-100 hover:bg-surface-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <SidebarContent sidebarLinks={sidebarLinks} onNavigate={() => setIsOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="hidden lg:flex lg:flex-col lg:w-64 shrink-0 bg-surface-900 border-r border-surface-800/50 min-h-screen">
        <div className="p-5 border-b border-surface-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-accent-500/10 ring-1 ring-accent-500/20">
              <BookOpen size={20} className="text-accent-400" />
            </div>
            <div>
              <h1 className="font-bold text-surface-100 text-sm tracking-tight">Dsa Book</h1>
              <p className="text-[10px] text-surface-500 font-medium tracking-wide">Master Pattern by Pattern</p>
            </div>
          </div>
        </div>
        <SidebarContent sidebarLinks={sidebarLinks} />
      </aside>
    </>
  );
}

function SidebarContent({ sidebarLinks, onNavigate }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex-1 py-3">
      <SidebarSection label="Overview">
        {sidebarLinks.filter((l) => l.section === 'main').map((link) => (
          <SidebarLink key={link.id} link={link} onNavigate={onNavigate} />
        ))}
      </SidebarSection>

      <SidebarSection label="Chapters">
        {sidebarLinks.filter((l) => l.section === 'chapters').map((link) => (
          <SidebarLink key={link.id} link={link} onNavigate={onNavigate} />
        ))}
      </SidebarSection>

      <SidebarSection label="">
        {sidebarLinks.filter((l) => l.section === 'utilities').map((link) => (
          <SidebarLink key={link.id} link={link} onNavigate={onNavigate} />
        ))}
      </SidebarSection>

      <div className="px-5 pt-2">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-5 py-2 text-sm text-surface-400 hover:text-surface-200 hover:bg-surface-800/40 rounded-lg transition-all w-full"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </nav>
  );
}

function SidebarSection({ label, children }) {
  return (
    <div className="mb-1">
      {label && (
        <p className="px-5 py-1.5 text-[10px] font-semibold text-surface-500 uppercase tracking-widest">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

function SidebarLink({ link, onNavigate }) {
  return (
    <NavLink to={link.path} onClick={onNavigate}>
      {({ isActive }) => (
        <div className={`flex items-center gap-3 px-5 py-2 text-sm transition-all ${
          isActive
            ? 'text-accent-400 bg-accent-500/[0.06] border-r-2 border-accent-400 font-medium'
            : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800/40'
        }`}
        >
          <link.icon size={16} strokeWidth={isActive ? 2 : 1.5} className="shrink-0" />
          <span>{link.label}</span>
        </div>
      )}
    </NavLink>
  );
}
