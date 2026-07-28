import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom doesn't implement matchMedia at all. App/Preloader/CustomCursor/
// AmbientBackground all call it on mount for every route. Default to
// "prefers-reduced-motion: reduce" matching — this both keeps tests fast
// and deterministic (the Preloader's 4.25s setTimeout chain never starts)
// and exercises the accessibility behavior we actually want. Override
// per-test via `vi.mocked(window.matchMedia)` where a non-reduced-motion
// case needs to be exercised.
window.matchMedia =
  window.matchMedia ||
  vi.fn().mockImplementation((query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

// jsdom has no IntersectionObserver. WebDesignCatalog.tsx instantiates one
// directly (not just via Framer Motion's whileInView), so any test that
// renders the Home route needs this stubbed.
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
// @ts-expect-error — minimal stub, not a full IntersectionObserver
window.IntersectionObserver = MockIntersectionObserver;

// jsdom has no ResizeObserver either. The @studio-freight/react-lenis smooth
// -scroll wrapper (mounted at the root of <App>) constructs one immediately,
// so any test rendering <App> needs this stubbed too.
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
window.ResizeObserver = MockResizeObserver;

// JSDOM has no support for HTMLCanvasElement.getContext()
HTMLCanvasElement.prototype.getContext = () => null;

// JSDOM has no support for window.scrollTo()
window.scrollTo = vi.fn();
