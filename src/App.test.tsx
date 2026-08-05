import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import './i18n';

describe('App routing', () => {
  it.each([
    '/',
    '/contact',
    '/impressum',
    '/datenschutz',
    '/does-not-exist',
  ])('renders the footer for %s without crashing', async (path) => {
    const { container, unmount } = render(
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
    unmount();
  });
});
