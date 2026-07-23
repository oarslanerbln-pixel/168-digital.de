import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ServicePage from './ServicePage';
import '../i18n';

describe('ServicePage', () => {
  it('shows a not-found fallback for an unknown slug', async () => {
    render(
      <MemoryRouter initialEntries={['/unknown-service-xyz']}>
        <Routes>
          <Route path="/:slug" element={<ServicePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Service Not Found')).toBeInTheDocument();
  });
});
