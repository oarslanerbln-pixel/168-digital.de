import { describe, it, expect, vi, afterEach } from 'vitest';
import { leadChannelOf, trackLead } from './thirdPartyAnalytics';

/*
 * Inquiries are the site's only goal, so how they are counted is pinned
 * here: the right event per channel, nothing personal in the payload, and
 * no call at all while the providers are absent (no consent given).
 */
describe('lead tracking', () => {
  afterEach(() => {
    delete window.gtag;
    delete window.fbq;
  });

  it('maps inquiry links to their channel and ignores everything else', () => {
    expect(leadChannelOf('https://wa.me/491787277867?text=Hallo')).toBe('whatsapp');
    expect(leadChannelOf('mailto:info.1618digital@gmail.com')).toBe('email');
    expect(leadChannelOf('tel:+491787277867')).toBe('phone');
    expect(leadChannelOf('/de/digital-menus')).toBeNull();
    expect(leadChannelOf('https://www.instagram.com/1618cinema/')).toBeNull();
  });

  it('is a no-op before consent has loaded any provider', () => {
    expect(() => trackLead('form', 'menu')).not.toThrow();
  });

  it('reports a form lead and a WhatsApp contact without personal data', () => {
    window.gtag = vi.fn();
    window.fbq = vi.fn();

    trackLead('form', 'menu');
    expect(window.gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      method: 'form',
      page_path: window.location.pathname,
      topic: 'menu',
    });
    expect(window.fbq).toHaveBeenCalledWith('track', 'Lead', { content_category: 'form' });

    trackLead('whatsapp');
    expect(window.gtag).toHaveBeenLastCalledWith('event', 'contact', {
      method: 'whatsapp',
      page_path: window.location.pathname,
    });
    expect(window.fbq).toHaveBeenLastCalledWith('track', 'Contact', { content_category: 'whatsapp' });
  });
});
