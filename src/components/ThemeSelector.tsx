import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { themes, ThemeName } from '@/lib/theme-config';
import { Palette, X, Check } from 'lucide-react';

interface ThemeSelectorProps {
  position?: 'header' | 'footer' | 'floating';
  showLabels?: boolean;
  compact?: boolean;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  position = 'floating',
  showLabels = false,
  compact = true
}) => {
  const { currentTheme, setTheme, isTransitioning } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isDarkTheme = currentTheme === 'clean-modern';

  const containerClasses = {
    header: 'flex items-center gap-2',
    footer: 'flex items-center justify-center gap-2',
    floating: 'fixed bottom-6 right-6 z-50'
  };

  // Theme-aware styles for the panel
  const panelBg = isDarkTheme
    ? 'bg-slate-800/95 border-slate-700'
    : 'bg-white/95 border-gray-200';
  const panelText = isDarkTheme ? 'text-white' : 'text-gray-900';
  const panelTextMuted = isDarkTheme ? 'text-slate-400' : 'text-gray-500';
  const panelBorder = isDarkTheme ? 'border-slate-700' : 'border-gray-100';
  const buttonBg = isDarkTheme
    ? 'bg-slate-900/80 border-slate-700'
    : 'bg-white/90 border-gray-200';
  const buttonIcon = isDarkTheme ? 'text-slate-300' : 'text-gray-600';
  const itemHover = isDarkTheme ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50/80';

  const ThemeButton: React.FC<{ themeName: ThemeName }> = ({ themeName }) => {
    const theme = themes[themeName];
    const isActive = currentTheme === themeName;

    return (
      <motion.button
        onClick={() => {
          setTheme(themeName);
          setIsOpen(false);
        }}
        disabled={isTransitioning}
        className={`
          relative flex items-center gap-3 p-3 rounded-xl transition-all duration-200 w-full text-left
          ${isActive
            ? `${isDarkTheme ? 'bg-sky-500/20 ring-2 ring-sky-500/30' : 'bg-primary/10 ring-2 ring-primary/30'} shadow-md`
            : itemHover
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        whileHover={{ scale: 1.01, x: 2 }}
        whileTap={{ scale: 0.98 }}
        aria-label={`Switch to ${theme.displayName} theme`}
      >
        {/* Theme preview circle */}
        <div
          className="w-6 h-6 rounded-full border-2 border-white/50 shadow-md flex-shrink-0 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`
          }}
        />

        <div className="flex flex-col flex-1">
          <span className={`text-sm font-semibold ${panelText}`}>
            {theme.displayName}
          </span>
          {isActive && (
            <motion.span
              className={`text-xs ${isDarkTheme ? 'text-sky-400' : 'text-primary'} font-medium`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              Current theme
            </motion.span>
          )}
        </div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className={`flex items-center justify-center w-5 h-5 rounded-full ${isDarkTheme ? 'bg-sky-500' : 'bg-primary'} text-white`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="w-3 h-3" />
          </motion.div>
        )}
      </motion.button>
    );
  };

  if (position === 'floating') {
    return (
      <div className={containerClasses[position]}>
        {/* Floating Action Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 ${buttonBg} backdrop-blur-md rounded-full shadow-lg border flex items-center justify-center transition-all duration-300 group`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open theme selector"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className={`w-5 h-5 ${buttonIcon}`} />
              </motion.div>
            ) : (
              <motion.div
                key="palette"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Palette className={`w-5 h-5 ${buttonIcon}`} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Theme Options Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`absolute bottom-14 right-0 w-64 ${panelBg} backdrop-blur-xl rounded-2xl shadow-2xl border p-5`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Header */}
              <div className={`flex items-center gap-3 mb-4 pb-3 border-b ${panelBorder}`}>
                <div className={`w-8 h-8 rounded-lg ${isDarkTheme ? 'bg-sky-500' : 'bg-primary'} flex items-center justify-center`}>
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className={`text-sm font-bold ${panelText}`}>Choose Theme</span>
                  <p className={`text-xs ${panelTextMuted}`}>Customize your experience</p>
                </div>
              </div>

              {/* Theme Options */}
              <div className="space-y-2">
                {Object.keys(themes).map((themeName) => (
                  <ThemeButton key={themeName} themeName={themeName as ThemeName} />
                ))}
              </div>

              {/* Transition Status */}
              {isTransitioning && (
                <motion.div
                  className={`text-xs ${panelTextMuted} mt-4 pt-3 border-t ${panelBorder} text-center flex items-center justify-center gap-2`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full ${isDarkTheme ? 'bg-sky-500' : 'bg-primary'}`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  Applying theme...
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Header/Footer layout
  return (
    <div className={containerClasses[position]}>
      {showLabels && (
        <span className="text-sm font-medium flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Theme:
        </span>
      )}

      <div className="flex gap-2">
        {Object.keys(themes).map((themeName) => {
          const theme = themes[themeName as ThemeName];
          const isActive = currentTheme === themeName;

          return (
            <motion.button
              key={themeName}
              onClick={() => setTheme(themeName as ThemeName)}
              disabled={isTransitioning}
              className={`
                w-8 h-8 rounded-full border-2 transition-all duration-200
                ${isActive ? 'border-white shadow-lg scale-110' : 'border-gray-300 hover:border-white hover:scale-105'}
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${theme.displayName} theme`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;