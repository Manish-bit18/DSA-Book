import { useState } from 'react';
import { Trash2, Info, Sun, Moon } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { ProblemStatus, SolvedTimestamps } from '../services/storageService';
import metadata from '../data/metadata.json';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleResetProgress = () => {
    ProblemStatus.resetAll();
    SolvedTimestamps.resetAll();
    setResetConfirm(false);
  };

  return (
    <>
      <Navbar title="Settings" backPath="/" />
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-2xl space-y-6">
        <section>
          <h2 className="text-sm font-semibold text-surface-100 mb-3 tracking-tight">About</h2>
          <div className="p-4 rounded-xl border border-surface-800/60 bg-surface-900/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-accent-500/5">
                <Info size={16} className="text-accent-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-surface-200">{metadata.appName}</p>
                <p className="text-xs text-surface-500">v{metadata.version}</p>
              </div>
            </div>
            <p className="text-xs text-surface-400 leading-relaxed">
              {metadata.description} Data is stored locally in your browser. No data is sent to any server.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-surface-100 mb-3 tracking-tight">Appearance</h2>
          <div className="p-4 rounded-xl border border-surface-800/60 bg-surface-900/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-accent-500/5">
                  {theme === 'dark' ? <Moon size={16} className="text-accent-400" /> : <Sun size={16} className="text-accent-400" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-200">Theme</p>
                  <p className="text-xs text-surface-500">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="relative w-11 h-6 rounded-full transition-colors duration-200 bg-surface-700 data-[checked=true]:bg-accent-500"
                data-checked={theme === 'light'}
                aria-label="Toggle theme"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    theme === 'light' ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-surface-100 mb-3 tracking-tight">Data Management</h2>
          <div className="p-4 rounded-xl border border-surface-800/60 bg-surface-900/80 space-y-3">
            <p className="text-xs text-surface-400 leading-relaxed">
              Your progress is stored in your browser's local storage. Resetting will clear all solved/attempting statuses.
            </p>
            {!resetConfirm ? (
              <Button variant="secondary" onClick={() => setResetConfirm(true)}>
                <Trash2 size={14} />
                Reset All Progress
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs text-red-400 font-medium">Are you sure?</span>
                <Button variant="secondary" onClick={handleResetProgress}>
                  Yes, Reset
                </Button>
                <Button variant="ghost" onClick={() => setResetConfirm(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
