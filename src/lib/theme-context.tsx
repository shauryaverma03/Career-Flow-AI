import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeName, ThemeConfig, themes, defaultTheme } from './theme-config';

interface ThemeContextType {
  currentTheme: ThemeName;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeName) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme: propDefaultTheme = defaultTheme,
  storageKey = 'careerflow-theme'
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(propDefaultTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && stored in themes) {
        setCurrentTheme(stored as ThemeName);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
  }, [storageKey]);

  // Apply theme to CSS custom properties
  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;

    // Apply theme colors as CSS custom properties
    root.style.setProperty('--background', theme.colors.background);
    root.style.setProperty('--foreground', theme.colors.foreground);
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--primary-foreground', theme.colors.primaryForeground);
    root.style.setProperty('--secondary', theme.colors.secondary);
    root.style.setProperty('--secondary-foreground', theme.colors.secondaryForeground);
    root.style.setProperty('--accent', theme.colors.accent);
    root.style.setProperty('--accent-foreground', theme.colors.accentForeground);
    root.style.setProperty('--muted', theme.colors.muted);
    root.style.setProperty('--border', theme.colors.border);

    // Set muted-foreground based on theme brightness
    const isDarkTheme = currentTheme === 'clean-modern';
    root.style.setProperty('--muted-foreground', isDarkTheme ? '#CBD5E1' : '#64748B');
    root.style.setProperty('--card', isDarkTheme ? '#1E293B' : '#FFFFFF');
    root.style.setProperty('--card-foreground', isDarkTheme ? '#F8FAFC' : '#0F172A');

    // Apply gradient colors
    root.style.setProperty(
      '--gradient-primary',
      `linear-gradient(135deg, ${theme.colors.gradient.primary.join(', ')})`
    );
    root.style.setProperty(
      '--gradient-secondary',
      `linear-gradient(135deg, ${theme.colors.gradient.secondary.join(', ')})`
    );
    root.style.setProperty(
      '--gradient-hero',
      `linear-gradient(180deg, ${theme.colors.gradient.hero.join(', ')})`
    );

    // Set body background for full page coverage
    document.body.style.backgroundColor = theme.colors.background;
    document.body.style.color = theme.colors.foreground;

    // Add theme class to body for CSS targeting
    document.body.className = document.body.className.replace(/theme-\\w+/g, '');
    document.body.classList.add(`theme-${currentTheme}`);

    // Add/remove dark class for Tailwind dark: variants
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [currentTheme]);

  const setTheme = (theme: ThemeName) => {
    if (theme === currentTheme) return;

    setIsTransitioning(true);
    setCurrentTheme(theme);

    // Persist to localStorage
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }

    // End transition after CSS has time to update
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const value: ThemeContextType = {
    currentTheme,
    themeConfig: themes[currentTheme],
    setTheme,
    isTransitioning
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};