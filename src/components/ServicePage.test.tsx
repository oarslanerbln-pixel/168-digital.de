import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  /*
   * The service hero's button is the page's main ask: it must land the
   * visitor on the form with this service's topic already chosen, so the
   * lead arrives sorted — and the WhatsApp link must name the service.
   */
  it('preselects the service topic and names the service on WhatsApp', async () => {
    Element.prototype.scrollIntoView = vi.fn();

    render(
      <MemoryRouter initialEntries={['/digital-menus']}>
        <Routes>
          <Route path="/:slug" element={<ServicePage />} />
        </Routes>
      </MemoryRouter>
    );

    const topic = (await screen.findByRole('radio', { name: 'Digital menu' })) as HTMLInputElement;
    expect(topic.checked).toBe(false);

    fireEvent.click(screen.getAllByRole('button', { name: /Book a free intro call/ })[0]);
    expect(topic.checked).toBe(true);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();

    const whatsapp = screen.getByRole('link', { name: 'Message on WhatsApp' });
    expect(decodeURIComponent(whatsapp.getAttribute('href') ?? '')).toContain('Digital Menus & Menu Boards');
  });
});
