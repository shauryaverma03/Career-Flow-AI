// Theme configuration for the landing page visual redesign
export type ThemeName = 'calm-blue' | 'teal-focus' | 'clean-modern' | 'warm-sand' | 'minimal';

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  border: string;
  gradient: {
    primary: string[];
    secondary: string[];
    hero: string[];
  };
}

export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  colors: ThemeColors;
  accessibility: {
    contrastRatio: number;
    supportsHighContrast: boolean;
  };
  performance: {
    enableAnimations: boolean;
    animationComplexity: 'low' | 'medium' | 'high';
  };
}

// Theme configurations based on requirements
export const themes: Record<ThemeName, ThemeConfig> = {
  'calm-blue': {
    name: 'calm-blue',
    displayName: 'Calm Blue',
    colors: {
      background: '#F8FAFC', // Lighter, more neutral slate-50
      foreground: '#1E293B', // Darker slate-800 for better contrast
      primary: '#3B82F6', // Blue-500, slightly softer than previous
      primaryForeground: '#FFFFFF',
      secondary: '#F1F5F9', // Slate-100
      secondaryForeground: '#1E293B',
      accent: '#10B981', // Emerald-500
      accentForeground: '#FFFFFF',
      muted: '#64748B', // Slate-500
      border: '#E2E8F0', // Slate-200
      gradient: {
        primary: ['#F8FAFC', '#EFF6FF', '#FFFFFF'], // Very subtle blue tint
        secondary: ['#F8FAFC', '#F1F5F9'],
        hero: ['#FFFFFF', '#F8FAFC', '#F1F5F9'] // Clean, almost white gradient
      }
    },
    accessibility: {
      contrastRatio: 4.5,
      supportsHighContrast: true
    },
    performance: {
      enableAnimations: true,
      animationComplexity: 'high'
    }
  },
  'teal-focus': {
    name: 'teal-focus',
    displayName: 'Teal Focus',
    colors: {
      background: '#F0FDFA', // Very light teal-50
      foreground: '#134E4A', // Teal-900
      primary: '#0D9488', // Teal-600
      primaryForeground: '#FFFFFF',
      secondary: '#CCFBF1', // Teal-100
      secondaryForeground: '#115E59', // Teal-800
      accent: '#F59E0B',
      accentForeground: '#FFFFFF',
      muted: '#64748B',
      border: '#99F6E4', // Teal-200
      gradient: {
        primary: ['#F0FDFA', '#E6FFFA', '#FFFFFF'], // Subtle mint/teal
        secondary: ['#F0FDFA', '#CCFBF1'],
        hero: ['#FFFFFF', '#F0FDFA', '#E6FFFA']
      }
    },
    accessibility: {
      contrastRatio: 4.5,
      supportsHighContrast: true
    },
    performance: {
      enableAnimations: true,
      animationComplexity: 'high'
    }
  },
  'clean-modern': { // Renamed visually to "Dark Mode" in selector if desired, but keeping key same to avoid breaking existing state
    name: 'clean-modern',
    displayName: 'Dark Mode',
    colors: {
      background: '#0B1120', // Deeper, richer blue-black (Slate-950 equivalent)
      foreground: '#F8FAFC', // Slate-50
      primary: '#38BDF8', // Sky-400
      primaryForeground: '#0F172A',
      secondary: '#1E293B', // Slate-800
      secondaryForeground: '#F8FAFC',
      accent: '#4ADE80', // Green-400
      accentForeground: '#0F172A',
      muted: '#94A3B8', // Slate-400
      border: '#1E293B', // Slate-800
      gradient: {
        primary: ['#0B1120', '#111827'], // Very subtle dark gradient
        secondary: ['#111827', '#1F2937'],
        hero: ['#020617', '#0F172A', '#1E293B'] // Deep, rich dark gradient
      }
    },
    accessibility: {
      contrastRatio: 7,
      supportsHighContrast: true
    },
    performance: {
      enableAnimations: true,
      animationComplexity: 'high'
    }
  },
  'warm-sand': {
    name: 'warm-sand',
    displayName: 'Warm Sand',
    colors: {
      background: '#FAFAF9', // Stone-50 (Warm gray/white)
      foreground: '#44403C', // Stone-700
      primary: '#D97706', // Amber-600
      primaryForeground: '#FFFFFF',
      secondary: '#F5F5F4', // Stone-100
      secondaryForeground: '#44403C',
      accent: '#EC4899',
      accentForeground: '#FFFFFF',
      muted: '#A8A29E', // Stone-400
      border: '#E7E5E4', // Stone-200
      gradient: {
        primary: ['#FAFAF9', '#F5F5F4', '#FFFFFF'], // Very subtle warm stone
        secondary: ['#FAFAF9', '#F5F5F4'],
        hero: ['#FFFFFF', '#FAFAF9', '#F5F5F4']
      }
    },
    accessibility: {
      contrastRatio: 4.5,
      supportsHighContrast: true
    },
    performance: {
      enableAnimations: true,
      animationComplexity: 'high'
    }
  },
  'minimal': {
    name: 'minimal',
    displayName: 'Minimal',
    colors: {
      background: '#FFFFFF',
      foreground: '#2D2D2D',
      primary: '#3A3A3A',
      primaryForeground: '#FFFFFF',
      secondary: '#F5F5F5',
      secondaryForeground: '#2D2D2D',
      accent: '#4A4A4A',
      accentForeground: '#FFFFFF',
      muted: '#8A8A8A',
      border: '#E5E5E5',
      gradient: {
        primary: ['#FFFFFF', '#FAFAFA', '#F5F5F5'],
        secondary: ['#FAFAFA', '#F5F5F5'],
        hero: ['#FFFFFF', '#FAFAFA', '#F5F5F5']
      }
    },
    accessibility: {
      contrastRatio: 7,
      supportsHighContrast: true
    },
    performance: {
      enableAnimations: true,
      animationComplexity: 'high'
    }
  }
};

export const defaultTheme: ThemeName = 'clean-modern';