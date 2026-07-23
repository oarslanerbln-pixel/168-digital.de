import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import CustomCursor from './CustomCursor';

function mockMatchMedia(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }) as unknown as MediaQueryList);
}

describe('CustomCursor', () => {
  afterEach(() => {
    document.body.style.cursor = '';
  });

  it('never hides the OS cursor when prefers-reduced-motion is set', () => {
    mockMatchMedia(true);
    render(<CustomCursor />);
    expect(document.body.style.cursor).not.toBe('none');
  });
});
