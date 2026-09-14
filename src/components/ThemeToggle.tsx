import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle(): React.ReactElement {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    // Sync state with DOM on mount
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    setIsDark(isCurrentlyDark);
  }, []);

  const toggleTheme = (): void => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Passer en mode clair (beige rétro)" : "Passer en mode sombre (blueprint)"}
      title={isDark ? "Mode clair : Papier millimétré rétro" : "Mode sombre : Blueprint cyanotype"}
      className="bevel-btn text-[0.625rem] flex items-center gap-1.5 py-1 px-2 hover:text-retro-cyan transition-colors"
    >
      {isDark ? (
        <>
          <Sun className="w-3 h-3 text-retro-yellow animate-spin-slow" />
          <span className="font-pixel">JOUR</span>
        </>
      ) : (
        <>
          <Moon className="w-3 h-3 text-cobalt" />
          <span className="font-pixel">NUIT</span>
        </>
      )}
    </button>
  );
}
