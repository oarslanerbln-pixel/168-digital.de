import { describe, it, expect } from 'vitest';
import { absoluteUrl, getPathLanguage, hreflangAlternates, localizePath, stripLanguagePrefix } from './localePath';

/*
 * These helpers decide every canonical, hreflang, sitemap entry and
 * prerendered file name. A wrong slash here means Google sees two URLs
 * for one page, or a hreflang pointing at a 404.
 */
describe('localePath', () => {
  it('reads the language from the path prefix only', () => {
    expect(getPathLanguage('/de')).toBe('de');
    expect(getPathLanguage('/tr/blog/x')).toBe('tr');
    expect(getPathLanguage('/about')).toBe('en');
    // A slug that merely starts with "de" is not German.
    expect(getPathLanguage('/design')).toBe('en');
  });

  it('switches a path between languages', () => {
    expect(localizePath('/', 'de')).toBe('/de');
    expect(localizePath('/about', 'tr')).toBe('/tr/about');
    expect(localizePath('/de/about', 'en')).toBe('/about');
    expect(localizePath('/de', 'en')).toBe('/');
    expect(stripLanguagePrefix('/tr/blog/x')).toBe('/blog/x');
  });

  it('builds absolute URLs and hreflang alternates', () => {
    expect(absoluteUrl('/', 'en')).toBe('https://1618-digital.de/');
    expect(absoluteUrl('/', 'de')).toBe('https://1618-digital.de/de');
    expect(hreflangAlternates('/contact')).toEqual([
      ['en', 'https://1618-digital.de/contact'],
      ['de', 'https://1618-digital.de/de/contact'],
      ['tr', 'https://1618-digital.de/tr/contact'],
      ['x-default', 'https://1618-digital.de/contact'],
    ]);
  });
});
