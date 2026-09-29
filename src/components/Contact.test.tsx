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

// Returns the key (or the inline fallback string) followed by any
// interpolation values, so a test can see what reached the message body.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: string | Record<string, string>) =>
      typeof opts === 'string' ? opts : [key, ...Object.values(opts ?? {})].join(' '),
  }),
}));

const sendLead = vi.fn();
vi.mock('../utils/leads', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../utils/leads')>()),
  sendLead: (...args: unknown[]) => sendLead(...args),
}));

function fillAndSubmit() {
  fireEvent.change(screen.getByLabelText('contact_name'), { target: { value: 'Ada' } });
  fireEvent.change(screen.getByLabelText('contact_email'), {
    target: { value: 'ada@example.com' },
  });
  fireEvent.change(screen.getByLabelText('contact_message'), { target: { value: 'Hallo' } });
  fireEvent.click(screen.getByRole('checkbox'));
  fireEvent.click(screen.getByRole('button', { name: /contact_send/ }));
}

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
    fillAndSubmit();

    await waitFor(() =>
      expect(sendLead).toHaveBeenCalledWith({
        name: 'Ada',
        email: 'ada@example.com',
        message: 'Hallo',
        source: 'Contact Form',
      })
    );
  });

  /*
   * A failed delivery must never be a dead end. This is the case that went
   * unnoticed in production: with no Web3Forms key, every submit failed and
   * the visitor was told to "try again" — which failed again.
   */
  it('offers WhatsApp and email with the typed text when delivery fails', async () => {
    sendLead.mockResolvedValue(false);
    render(<Contact />);
    fillAndSubmit();

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('contact_error');

    const whatsapp = screen.getByRole('link', { name: /contact_fallback_whatsapp/ });
    const email = screen.getByRole('link', { name: /contact_fallback_email/ });

    const waUrl = new URL(whatsapp.getAttribute('href')!);
    expect(waUrl.origin + waUrl.pathname).toBe('https://wa.me/491787277867');
    expect(waUrl.searchParams.get('text')).toContain('Hallo');
    expect(waUrl.searchParams.get('text')).toContain('ada@example.com');

    const mailto = email.getAttribute('href')!;
    expect(mailto.startsWith('mailto:info.1618digital@gmail.com?')).toBe(true);
    expect(decodeURIComponent(mailto)).toContain('Hallo');
  });

  it('shows no fallback while delivery succeeds', async () => {
    render(<Contact />);
    fillAndSubmit();

    expect(await screen.findByText('contact_success')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('caps field lengths', () => {
    render(<Contact />);
    expect(screen.getByLabelText('contact_name')).toHaveAttribute('maxLength', '100');
    expect(screen.getByLabelText('contact_email')).toHaveAttribute('maxLength', '254');
    expect(screen.getByLabelText('contact_message')).toHaveAttribute('maxLength', '3000');
  });
});
