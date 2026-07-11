import { createContext, useContext, useState, useEffect } from 'react';
import { Settings } from '../services/storageService';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => Settings.get().theme || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    Settings.set({ ...Settings.get(), theme });
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
