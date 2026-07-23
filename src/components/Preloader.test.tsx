import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import '../i18n';

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

describe('Preloader gating', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('never mounts when prefers-reduced-motion is set', () => {
    mockMatchMedia(true);
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(container.querySelector('.preloader-overlay-p')).toBeNull();
  });

  it('does not mount if the intro was already seen within the last 24h', () => {
    mockMatchMedia(false);
    localStorage.setItem('1618_intro_seen_at', String(Date.now()));
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(container.querySelector('.preloader-overlay-p')).toBeNull();
  });
});
