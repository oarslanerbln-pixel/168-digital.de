import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import './i18n';
import { vi } from 'vitest';

vi.mock('./pages/Home', () => ({ default: () => <div data-testid="route-content">Home</div> }));
vi.mock('./components/ServicePage', () => ({ default: () => <div data-testid="route-content">Service</div> }));
vi.mock('./pages/LegalPage', () => ({ default: () => <div data-testid="route-content">Legal</div> }));
vi.mock('./pages/ContactPage', () => ({ default: () => <div data-testid="route-content">Contact</div> }));
vi.mock('./components/DevConsole', () => ({ default: () => <div data-testid="dev-console">DevConsole</div> }));


describe('App routing', () => {
  it.each([
    '/',
    '/contact',
    '/impressum',
    '/datenschutz',
    '/does-not-exist',
  ])('renders the footer for %s without crashing', async (path) => {
    const { container } = render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );

    // Footer lives inside <main>, so it isn't exposed as the "contentinfo"
    // landmark role (that's only implicit when <footer> is NOT nested in a
    // sectioning element) — query it directly instead.
    await waitFor(
      () => expect(container.querySelector('.footer-wrapper')).toBeInTheDocument(),
      { timeout: 5000 }
    );
  });
});
