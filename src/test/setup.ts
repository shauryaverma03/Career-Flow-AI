import '@testing-library/jest-dom';

// Mock IntersectionObserver for scroll animation tests
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock requestAnimationFrame for animation tests
global.requestAnimationFrame = vi.fn().mockImplementation(cb => setTimeout(cb, 16));
global.cancelAnimationFrame = vi.fn().mockImplementation(id => clearTimeout(id));

// Mock matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});