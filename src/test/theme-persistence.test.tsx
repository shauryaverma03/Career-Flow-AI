import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import React from 'react';
import { ThemeProvider, useTheme } from '@/lib/theme-context';
import { themes, ThemeName } from '@/lib/theme-config';

// Simple test component to access theme context
const ThemeTestComponent = () => {
  const { currentTheme } = useTheme();
  return <span data-testid="current-theme">{currentTheme}</span>;
};

describe('Theme Persistence Property Tests', () => {
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
  });

  afterEach(() => {
    cleanup();
  });

  /**
   * Property 8: Theme Persistence
   * For any theme selection change, the chosen theme should persist across page reloads
   * Validates: Requirements 3.6
   */
  it('should persist theme selection across page reloads', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.keys(themes) as ThemeName[]),
        (selectedTheme) => {
          // Clean up any previous renders
          cleanup();
          
          // Arrange: Set theme in localStorage (simulating previous session)
          mockStorage['careerflow-theme'] = selectedTheme;

          // Act: Initialize ThemeProvider (simulating page reload)
          render(
            <ThemeProvider>
              <ThemeTestComponent />
            </ThemeProvider>
          );

          // Assert: Should load the persisted theme
          const currentThemeElement = screen.getByTestId('current-theme');
          expect(currentThemeElement.textContent).toBe(selectedTheme);
          
          // Clean up for next iteration
          cleanup();
        }
      ),
      { numRuns: 10 }
    );
  });

  it('should handle localStorage failures gracefully', () => {
    // Arrange: Mock localStorage to throw an error
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => {
          throw new Error('localStorage not available');
        }),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });

    // Act & Assert: Should not throw error and use default theme
    expect(() => {
      render(
        <ThemeProvider>
          <ThemeTestComponent />
        </ThemeProvider>
      );
    }).not.toThrow();

    const currentThemeElement = screen.getByTestId('current-theme');
    expect(currentThemeElement.textContent).toBe('calm-blue');
  });

  it('should load persisted theme on initialization', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.keys(themes) as ThemeName[]),
        (persistedTheme) => {
          // Clean up any previous renders
          cleanup();
          
          // Arrange: Set theme in localStorage before initialization
          mockStorage['careerflow-theme'] = persistedTheme;

          // Act: Initialize ThemeProvider
          render(
            <ThemeProvider>
              <ThemeTestComponent />
            </ThemeProvider>
          );

          // Assert: Should load the persisted theme
          const currentThemeElement = screen.getByTestId('current-theme');
          expect(currentThemeElement.textContent).toBe(persistedTheme);
          
          // Clean up for next iteration
          cleanup();
        }
      ),
      { numRuns: 10 }
    );
  });

  it('should use default theme when no theme is persisted', () => {
    // Arrange: Ensure localStorage is empty
    mockStorage = {};

    // Act: Initialize ThemeProvider
    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    // Assert: Should use default theme (calm-blue)
    const currentThemeElement = screen.getByTestId('current-theme');
    expect(currentThemeElement.textContent).toBe('calm-blue');
  });

  it('should ignore invalid themes in localStorage', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => !Object.keys(themes).includes(s) && s.length > 0 && s.trim().length > 0),
        (invalidTheme) => {
          // Clean up any previous renders
          cleanup();
          
          // Arrange: Set invalid theme in localStorage
          mockStorage['careerflow-theme'] = invalidTheme;

          // Act: Initialize ThemeProvider
          render(
            <ThemeProvider>
              <ThemeTestComponent />
            </ThemeProvider>
          );

          // Assert: Should fall back to default theme
          const currentThemeElement = screen.getByTestId('current-theme');
          expect(currentThemeElement.textContent).toBe('calm-blue');
          
          // Clean up for next iteration
          cleanup();
        }
      ),
      { numRuns: 10 }
    );
  });
});