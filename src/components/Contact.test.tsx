import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from './Contact';

/*
 * The contact form is the site's only conversion path, so the two things
 * that would silently cost a lead are pinned here: the submit button must
 * stay disabled until consent is given, and the consent control must be a
 * real checkbox the browser and assistive tech can operate. It used to be
 * a <div role="checkbox">, which looked identical and satisfied neither.
 */

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, fallback?: string) => fallback ?? _key,
  }),
}));

const sendLead = vi.fn();
vi.mock('../utils/leads', () => ({
  sendLead: (...args: unknown[]) => sendLead(...args),
}));

describe('Contact form', () => {
  beforeEach(() => {
    sendLead.mockReset();
    sendLead.mockResolvedValue(true);
  });

  it('exposes the DSGVO consent as a native checkbox', () => {
    render(<Contact />);
    const consent = screen.getByRole('checkbox');
    expect(consent).toBeInstanceOf(HTMLInputElement);
    expect((consent as HTMLInputElement).type).toBe('checkbox');
    expect((consent as HTMLInputElement).required).toBe(true);
  });

  it('keeps submit disabled until consent is given', () => {
    render(<Contact />);

    const submit = screen.getByRole('button', { name: /contact_send/ });
    expect(submit).toBeDisabled();

    fireEvent.click(screen.getByRole('checkbox'));
    expect(submit).toBeEnabled();
  });

  it('toggles consent by clicking the label text, not only the icon', () => {
    render(<Contact />);

    const consent = screen.getByRole('checkbox') as HTMLInputElement;
    fireEvent.click(screen.getByText('contact_dsgvo_consent'));
    expect(consent.checked).toBe(true);
  });

  it('sends the typed values once consent is given', async () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText('contact_name'), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByLabelText('contact_email'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('contact_message'), { target: { value: 'Hallo' } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /contact_send/ }));

    await waitFor(() =>
      expect(sendLead).toHaveBeenCalledWith({
        name: 'Ada',
        email: 'ada@example.com',
        message: 'Hallo',
        source: 'Contact Form',
      })
    );
  });
});
