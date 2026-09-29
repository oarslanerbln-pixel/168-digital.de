import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ServicePage from './ServicePage';
import '../i18n';

describe('ServicePage', () => {
  it('shows the shared not-found page for an unknown slug', async () => {
    // index.html ships this tag; jsdom's empty document does not.
    const robots = document.createElement('meta');
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'index, follow');
    document.head.appendChild(robots);

    render(
      <MemoryRouter initialEntries={['/unknown-service-xyz']}>
        <Routes>
          <Route path="/:slug" element={<ServicePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Page Not Found')).toBeInTheDocument();
    // Vercel answers 200 for every path; noindex is what keeps typos out of the index.
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, follow');
  });
});
