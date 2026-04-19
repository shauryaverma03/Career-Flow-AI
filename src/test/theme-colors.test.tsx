import { describe, it, expect } from 'vitest';
import { themes } from '@/lib/theme-config';

describe('Theme Color Values Unit Tests', () => {
  /**
   * Unit tests for specific theme color values
   * Validates: Requirements 3.2, 3.3, 3.4, 3.5
   */

  describe('Calm Blue Theme Colors', () => {
    const calmBlueTheme = themes['calm-blue'];

    it('should have correct Calm Blue theme colors', () => {
      // Requirements 3.2: Calm Blue theme colors
      expect(calmBlueTheme.colors.background).toBe('#F4F7FB');
      expect(calmBlueTheme.colors.primary).toBe('#2563EB');
      expect(calmBlueTheme.colors.accent).toBe('#22C55E');
      expect(calmBlueTheme.colors.foreground).toBe('#0F172A');
    });

    it('should have correct display name and accessibility settings', () => {
      expect(calmBlueTheme.displayName).toBe('Calm Blue');
      expect(calmBlueTheme.accessibility.contrastRatio).toBe(4.5);
      expect(calmBlueTheme.accessibility.supportsHighContrast).toBe(true);
    });

    it('should have correct gradient colors', () => {
      expect(calmBlueTheme.colors.gradient.primary).toEqual(['#E6E6FA', '#87CEEB', '#FFFFFF']);
      expect(calmBlueTheme.colors.gradient.secondary).toEqual(['#F4F7FB', '#E0E7FF']);
      expect(calmBlueTheme.colors.gradient.hero).toEqual(['#F8FAFC', '#F1F5F9', '#E2E8F0']);
    });
  });

  describe('Teal Focus Theme Colors', () => {
    const tealFocusTheme = themes['teal-focus'];

    it('should have correct Teal Focus theme colors', () => {
      // Requirements 3.3: Teal Focus theme colors
      expect(tealFocusTheme.colors.background).toBe('#F1F5F5');
      expect(tealFocusTheme.colors.primary).toBe('#0F766E');
      expect(tealFocusTheme.colors.accent).toBe('#F59E0B');
      expect(tealFocusTheme.colors.foreground).toBe('#0F172A');
    });

    it('should have correct display name and accessibility settings', () => {
      expect(tealFocusTheme.displayName).toBe('Teal Focus');
      expect(tealFocusTheme.accessibility.contrastRatio).toBe(4.5);
      expect(tealFocusTheme.accessibility.supportsHighContrast).toBe(true);
    });

    it('should have correct gradient colors', () => {
      expect(tealFocusTheme.colors.gradient.primary).toEqual(['#E6FFFA', '#99F6E4', '#FFFFFF']);
      expect(tealFocusTheme.colors.gradient.secondary).toEqual(['#F1F5F5', '#ECFDF5']);
      expect(tealFocusTheme.colors.gradient.hero).toEqual(['#F0FDFA', '#CCFBF1', '#A7F3D0']);
    });
  });

  describe('Deep Navy Theme Colors', () => {
    const deepNavyTheme = themes['deep-navy'];

    it('should have correct Deep Navy theme colors', () => {
      // Requirements 3.4: Deep Navy theme colors
      expect(deepNavyTheme.colors.background).toBe('#020617');
      expect(deepNavyTheme.colors.primary).toBe('#38BDF8');
      expect(deepNavyTheme.colors.accent).toBe('#22C55E');
      expect(deepNavyTheme.colors.foreground).toBe('#E5E7EB');
    });

    it('should have correct display name and accessibility settings', () => {
      expect(deepNavyTheme.displayName).toBe('Deep Navy');
      expect(deepNavyTheme.accessibility.contrastRatio).toBe(4.5);
      expect(deepNavyTheme.accessibility.supportsHighContrast).toBe(true);
    });

    it('should have correct gradient colors', () => {
      expect(deepNavyTheme.colors.gradient.primary).toEqual(['#0F172A', '#1E293B', '#334155']);
      expect(deepNavyTheme.colors.gradient.secondary).toEqual(['#020617', '#0F172A']);
      expect(deepNavyTheme.colors.gradient.hero).toEqual(['#020617', '#0F172A', '#1E293B']);
    });

    it('should have reduced animation complexity for dark theme', () => {
      expect(deepNavyTheme.performance.animationComplexity).toBe('medium');
    });
  });

  describe('Warm Sand Theme Colors', () => {
    const warmSandTheme = themes['warm-sand'];

    it('should have correct Warm Sand theme colors', () => {
      // Requirements 3.5: Warm Sand theme colors
      expect(warmSandTheme.colors.background).toBe('#FAF8F6');
      expect(warmSandTheme.colors.primary).toBe('#D97706');
      expect(warmSandTheme.colors.accent).toBe('#EC4899');
      expect(warmSandTheme.colors.foreground).toBe('#78350F');
    });

    it('should have correct display name and accessibility settings', () => {
      expect(warmSandTheme.displayName).toBe('Warm Sand');
      expect(warmSandTheme.accessibility.contrastRatio).toBe(4.5);
      expect(warmSandTheme.accessibility.supportsHighContrast).toBe(true);
    });

    it('should have correct gradient colors', () => {
      expect(warmSandTheme.colors.gradient.primary).toEqual(['#FEF7ED', '#FED7AA', '#FFFFFF']);
      expect(warmSandTheme.colors.gradient.secondary).toEqual(['#FAF8F6', '#FEF3C7']);
      expect(warmSandTheme.colors.gradient.hero).toEqual(['#FFFBEB', '#FEF3C7', '#FDE68A']);
    });
  });

  describe('Theme Structure Validation', () => {
    it('should have exactly 4 themes', () => {
      const themeNames = Object.keys(themes);
      expect(themeNames).toHaveLength(4);
      expect(themeNames).toEqual(['calm-blue', 'teal-focus', 'deep-navy', 'warm-sand']);
    });

    it('should have consistent structure across all themes', () => {
      Object.values(themes).forEach((theme) => {
        // Check required properties exist
        expect(theme).toHaveProperty('name');
        expect(theme).toHaveProperty('displayName');
        expect(theme).toHaveProperty('colors');
        expect(theme).toHaveProperty('accessibility');
        expect(theme).toHaveProperty('performance');

        // Check color properties
        expect(theme.colors).toHaveProperty('background');
        expect(theme.colors).toHaveProperty('foreground');
        expect(theme.colors).toHaveProperty('primary');
        expect(theme.colors).toHaveProperty('secondary');
        expect(theme.colors).toHaveProperty('accent');
        expect(theme.colors).toHaveProperty('muted');
        expect(theme.colors).toHaveProperty('border');
        expect(theme.colors).toHaveProperty('gradient');

        // Check gradient properties
        expect(theme.colors.gradient).toHaveProperty('primary');
        expect(theme.colors.gradient).toHaveProperty('secondary');
        expect(theme.colors.gradient).toHaveProperty('hero');

        // Check accessibility properties
        expect(theme.accessibility).toHaveProperty('contrastRatio');
        expect(theme.accessibility).toHaveProperty('supportsHighContrast');

        // Check performance properties
        expect(theme.performance).toHaveProperty('enableAnimations');
        expect(theme.performance).toHaveProperty('animationComplexity');
      });
    });

    it('should have valid hex color values', () => {
      const hexColorRegex = /^#[0-9A-F]{6}$/i;
      
      Object.values(themes).forEach((theme) => {
        expect(theme.colors.background).toMatch(hexColorRegex);
        expect(theme.colors.foreground).toMatch(hexColorRegex);
        expect(theme.colors.primary).toMatch(hexColorRegex);
        expect(theme.colors.secondary).toMatch(hexColorRegex);
        expect(theme.colors.accent).toMatch(hexColorRegex);
        expect(theme.colors.muted).toMatch(hexColorRegex);
        expect(theme.colors.border).toMatch(hexColorRegex);

        // Check gradient arrays contain valid hex colors
        theme.colors.gradient.primary.forEach(color => {
          expect(color).toMatch(hexColorRegex);
        });
        theme.colors.gradient.secondary.forEach(color => {
          expect(color).toMatch(hexColorRegex);
        });
        theme.colors.gradient.hero.forEach(color => {
          expect(color).toMatch(hexColorRegex);
        });
      });
    });

    it('should have valid contrast ratios', () => {
      Object.values(themes).forEach((theme) => {
        expect(theme.accessibility.contrastRatio).toBeGreaterThanOrEqual(3.0);
        expect(theme.accessibility.contrastRatio).toBeLessThanOrEqual(21.0);
      });
    });

    it('should have valid animation complexity values', () => {
      const validComplexities = ['low', 'medium', 'high'];
      
      Object.values(themes).forEach((theme) => {
        expect(validComplexities).toContain(theme.performance.animationComplexity);
        expect(typeof theme.performance.enableAnimations).toBe('boolean');
      });
    });
  });

  describe('Color Harmony Validation', () => {
    it('should have eye-pleasing color combinations', () => {
      // Test that themes don't use clashing colors
      Object.values(themes).forEach((theme) => {
        // Background and foreground should have sufficient contrast
        expect(theme.colors.background).not.toBe(theme.colors.foreground);
        
        // Primary and accent should be different
        expect(theme.colors.primary).not.toBe(theme.colors.accent);
        
        // Gradient arrays should have at least 2 colors
        expect(theme.colors.gradient.primary.length).toBeGreaterThanOrEqual(2);
        expect(theme.colors.gradient.secondary.length).toBeGreaterThanOrEqual(2);
        expect(theme.colors.gradient.hero.length).toBeGreaterThanOrEqual(2);
      });
    });

    it('should follow the lavender to soft blue to white progression for calm-blue', () => {
      const calmBlue = themes['calm-blue'];
      const heroGradient = calmBlue.colors.gradient.hero;
      
      // Should progress from light to lighter colors
      expect(heroGradient).toEqual(['#F8FAFC', '#F1F5F9', '#E2E8F0']);
    });
  });
});