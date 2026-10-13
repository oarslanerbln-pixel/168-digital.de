import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SEOHead, { SeoCollectorContext, type SeoData } from './SEOHead';
import '../i18n';

describe('SEOHead', () => {
  it('sets document.title from the title prop', () => {
    render(<SEOHead path="/test" title="Custom Title" description="Custom description" />);
    expect(document.title).toBe('Custom Title');
  });

  /*
   * The build-time prerender reads <head> values through this context,
   * because effects never run in a server render. If it stopped reporting,
   * every prerendered page would silently ship the homepage's meta tags.
   */
  it('reports resolved values to a prerender collector', () => {
    let seo: SeoData | null = null;
    render(
      <SeoCollectorContext.Provider value={(data) => { seo = data; }}>
        <SEOHead path="/about" title="About" jsonLd={{ '@type': 'Thing' }} />
      </SeoCollectorContext.Provider>
    );
    expect(seo).toMatchObject({
      title: 'About',
      canonical: 'https://1618-digital.de/about',
      alternates: [
        ['en', 'https://1618-digital.de/about'],
        ['de', 'https://1618-digital.de/de/about'],
        ['tr', 'https://1618-digital.de/tr/about'],
        ['x-default', 'https://1618-digital.de/about'],
      ],
      noindex: false,
      jsonLd: [{ '@type': 'Thing' }],
    });
  });
});
