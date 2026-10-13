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
    '/de',
    '/de/contact',
    '/tr/impressum',
    '/de/does-not-exist',
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

  /*
   * The language lives in the path: /de/… must render German whatever the
   * visitor's stored choice, or the prerendered German HTML and the page
   * the browser shows would disagree.
   */
  it('renders the language named by the path', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/de/contact']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => expect(document.documentElement.lang).toBe('de'), { timeout: 5000 });
    await waitFor(
      () => expect(container.querySelector('a[href="/de/about"]')).toBeInTheDocument(),
      { timeout: 5000 }
    );
  });
});
