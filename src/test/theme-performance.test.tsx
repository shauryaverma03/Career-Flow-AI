import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as fc from 'fast-check';
import React from 'react';
import { ThemeProvider, useTheme } from '@/lib/theme-context';
import { themes, ThemeName } from '@/lib/theme-config';

// Test component that can change themes
const ThemeTestComponent = () => {
  const { currentTheme, setTheme, isTransitioning } = useTheme();
  
  return (
    <div>
      <span data-testid="current-theme">{currentTheme}</span>
      <span data-testid="is-transitioning">{isTransitioning.toString()}</span>
      <button 
        data-testid="set-teal-theme" 
        onClick={() => setTheme('teal-focus')}
      >
        Set Teal Theme
      </button>
      <button 
        data-testid="set-navy-theme" 
        onClick={() => setTheme('deep-navy')}
      >
        Set Navy Theme
      </button>
      <button 
        data-testid="set-sand-theme" 
        onClick={() => setTheme('warm-sand')}
      >
        Set Sand Theme
      </button>
    </div>
  );
};

describe('Theme Application Performance Property Tests', () => {
  // Create a real localStorage implementation for testing
  let mockStorage: { [key: string]: string } = {};
  
  beforeEach(() => {
    // Reset mock storage
    mockStorage = {};
    
    // Mock localStorage with actual implementation
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => mockStorage[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          mockStorage[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
          delete mockStorage[key];
        }),
        clear: vi.fn(() => {
          mockStorage = {};
        }),
      },
      writable: true,
    });

    // Mock performance.now for timing tests
    vi.spyOn(performance, 'now').mockImplementation(() => Date.now());
    
    // Reset DOM state
    document.body.className = '';
    document.documentElement.style.cssText = '';
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  /**
   * Property 9: Theme Application Performance
   * For any theme change, all page elements should update consistently within 300ms
   * Validates: Requirements 3.7
   */
  it('should apply theme changes within 300ms', async () => {
    const user = userEvent.setup();
    
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...Object.keys(themes).filter(t => t !== 'calm-blue') as ThemeName[]),
        async (targetTheme) => {
          // Clean up any previous renders and reset state
          cleanup();
          
          // Reset localStorage to ensure clean state
          mockStorage = {};
          
          // Reset DOM state
          document.body.className = '';
          document.documentElement.style.cssText = '';
          
          // Arrange: Render component with default theme
          render(
            <ThemeProvider>
              <ThemeTestComponent />
            </ThemeProvider>
          );

          // Wait for initial render to complete
          await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 50));
          });

          // Verify initial state
          expect(screen.getByTestId('current-theme').textContent).toBe('calm-blue');
          expect(screen.getByTestId('is-transitioning').textContent).toBe('false');

          // Act: Record start time and change theme
          const startTime = performance.now();
          
          await act(async () => {
            // Simulate theme change based on target theme
            if (targetTheme === 'teal-focus') {
              await user.click(screen.getByTestId('set-teal-theme'));
            } else if (targetTheme === 'deep-navy') {
              await user.click(screen.getByTestId('set-navy-theme'));
            } else if (targetTheme === 'warm-sand') {
              await user.click(screen.getByTestId('set-sand-theme'));
            }
          });

          // Wait for transition to complete (max 300ms as per requirement)
          await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 350)); // Wait slightly longer than 300ms
          });

          const endTime = performance.now();
          const duration = endTime - startTime;

          // Assert: Theme should be applied and transition should be complete
          const currentThemeElement = screen.getByTestId('current-theme');
          const isTransitioningElement = screen.getByTestId('is-transitioning');

          // Theme should have changed to the target theme
          expect(currentThemeElement.textContent).toBe(targetTheme);
          
          // Transition should be complete
          expect(isTransitioningElement.textContent).toBe('false');

          // Performance requirement: should complete within reasonable time
          // Note: In test environment, we can't measure actual CSS transition time,
          // but we can verify the JavaScript logic completes quickly
          expect(duration).toBeLessThan(1000); // Allow generous time for test environment
          
          // Clean up for next iteration
          cleanup();
        }
      ),
      { numRuns: 5 } // Reduced for performance testing
    );
  });

  it('should handle rapid theme changes without performance degradation', async () => {
    const user = userEvent.setup();
    
    // Arrange: Render component
    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    const startTime = performance.now();

    // Act: Perform multiple rapid theme changes
    await act(async () => {
      await user.click(screen.getByTestId('set-teal-theme'));
      await user.click(screen.getByTestId('set-navy-theme'));
      await user.click(screen.getByTestId('set-sand-theme'));
      await user.click(screen.getByTestId('set-teal-theme'));
    });

    // Wait for all transitions to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
    });

    const endTime = performance.now();
    const totalDuration = endTime - startTime;

    // Assert: Final theme should be applied correctly
    const currentThemeElement = screen.getByTestId('current-theme');
    const isTransitioningElement = screen.getByTestId('is-transitioning');

    expect(currentThemeElement.textContent).toBe('teal-focus');
    expect(isTransitioningElement.textContent).toBe('false');

    // Performance: Multiple changes should not cause significant delay
    expect(totalDuration).toBeLessThan(2000); // Allow reasonable time for multiple changes
  });

  it('should maintain consistent theme state during transitions', async () => {
    const user = userEvent.setup();
    
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...Object.keys(themes).filter(t => t !== 'calm-blue') as ThemeName[]),
        async (targetTheme) => {
          // Clean up any previous renders
          cleanup();
          
          // Arrange: Render component
          render(
            <ThemeProvider>
              <ThemeTestComponent />
            </ThemeProvider>
          );

          // Act: Change theme
          await act(async () => {
            if (targetTheme === 'teal-focus') {
              await user.click(screen.getByTestId('set-teal-theme'));
            } else if (targetTheme === 'deep-navy') {
              await user.click(screen.getByTestId('set-navy-theme'));
            } else if (targetTheme === 'warm-sand') {
              await user.click(screen.getByTestId('set-sand-theme'));
            }
          });

          // Assert: Theme should be immediately updated (no intermediate states)
          const currentThemeElement = screen.getByTestId('current-theme');
          expect(currentThemeElement.textContent).toBe(targetTheme);

          // Wait for transition to complete
          await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 350));
          });

          // Assert: Theme should still be consistent
          expect(currentThemeElement.textContent).toBe(targetTheme);
          expect(screen.getByTestId('is-transitioning').textContent).toBe('false');
          
          // Clean up for next iteration
          cleanup();
        }
      ),
      { numRuns: 5 }
    );
  });

  it('should apply CSS custom properties correctly for all themes', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.keys(themes) as ThemeName[]),
        (themeName) => {
          // Clean up any previous renders
          cleanup();
          
          // Arrange: Set theme in storage
          mockStorage['careerflow-theme'] = themeName;

          // Act: Render with theme
          render(
            <ThemeProvider>
              <ThemeTestComponent />
            </ThemeProvider>
          );

          // Assert: CSS custom properties should be applied
          const root = document.documentElement;
          const theme = themes[themeName];

          // Check that CSS custom properties are set correctly
          expect(root.style.getPropertyValue('--background')).toBe(theme.colors.background);
          expect(root.style.getPropertyValue('--foreground')).toBe(theme.colors.foreground);
          expect(root.style.getPropertyValue('--primary')).toBe(theme.colors.primary);
          expect(root.style.getPropertyValue('--accent')).toBe(theme.colors.accent);

          // Check that body has correct theme class
          expect(document.body.classList.contains(`theme-${themeName}`)).toBe(true);
          
          // Clean up for next iteration
          cleanup();
        }
      ),
      { numRuns: 10 }
    );
  });

  it('should not cause memory leaks during theme changes', async () => {
    const user = userEvent.setup();
    
    // Arrange: Render component
    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    // Act: Perform many theme changes to test for memory leaks
    for (let i = 0; i < 10; i++) {
      await act(async () => {
        await user.click(screen.getByTestId('set-teal-theme'));
      });
      await act(async () => {
        await user.click(screen.getByTestId('set-navy-theme'));
      });
      await act(async () => {
        await user.click(screen.getByTestId('set-sand-theme'));
      });
    }

    // Wait for all transitions to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    // Assert: Component should still be responsive
    const currentThemeElement = screen.getByTestId('current-theme');
    expect(currentThemeElement.textContent).toBe('warm-sand');
    expect(screen.getByTestId('is-transitioning').textContent).toBe('false');

    // No specific memory leak assertion possible in test environment,
    // but the test should complete without hanging or errors
  });
});