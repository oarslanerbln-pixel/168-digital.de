import { useTranslation } from 'react-i18next';

/* ════════════════════════════════════════════════════════════════
   LANGUAGE PATHS — the one place that knows how a language maps to a URL.

   English lives at the bare path (/about), German and Turkish under a
   prefix (/de/about, /tr/about). Each language therefore has its own URL
   that the build prerenders into its own static HTML file, so crawlers
   that do not run JavaScript read the German page as German.

   This replaced ?lang=de query variants: those were valid hreflang
   targets but could not be prerendered (a static host serves one file per
   path, whatever the query), so every non-English crawl got English HTML.
   vercel.json 301s the old ?lang= URLs here.

   English stays unprefixed so every URL that was already indexed and
   linked keeps working unchanged.
   ════════════════════════════════════════════════════════════════ */

export const SUPPORTED_LANGUAGES = ['en', 'de', 'tr'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

/** Languages that live under a path prefix. English is the unprefixed default. */
export const PREFIXED_LANGUAGES: readonly Language[] = ['de', 'tr'];

export const SITE_URL = 'https://1618-digital.de';

export const OG_LOCALES: Record<Language, string> = { en: 'en_US', de: 'de_DE', tr: 'tr_TR' };

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

/** Normalises an i18next code ("de-DE", "en") to a supported language. */
export function toLanguage(code: string | undefined): Language {
  const base = (code ?? '').substring(0, 2).toLowerCase();
  return isLanguage(base) ? base : 'en';
}

const PREFIX_RE = /^\/(de|tr)(?=\/|$)/;

/** The language a pathname is in: "/de/about" → "de", "/about" → "en". */
export function getPathLanguage(pathname: string): Language {
  const match = pathname.match(PREFIX_RE);
  return match ? (match[1] as Language) : 'en';
}

export function hasLanguagePrefix(pathname: string): boolean {
  return PREFIX_RE.test(pathname);
}

/** The language-neutral page path: "/de/about" → "/about", "/de" → "/". */
export function stripLanguagePrefix(pathname: string): string {
  return pathname.replace(PREFIX_RE, '') || '/';
}

/**
 * The same page in another language: localizePath("/about", "de") → "/de/about".
 * Accepts already-prefixed paths, so it also switches languages. The German
 * homepage is "/de" (no trailing slash), matching dist/de.html under cleanUrls.
 */
export function localizePath(path: string, lang: Language): string {
  const neutral = stripLanguagePrefix(path);
  if (lang === 'en') return neutral;
  return neutral === '/' ? `/${lang}` : `/${lang}${neutral}`;
}

/** Absolute URL, as used by canonical, hreflang, sitemap and JSON-LD. */
export function absoluteUrl(path: string, lang: Language): string {
  const localized = localizePath(path, lang);
  return localized === '/' ? `${SITE_URL}/` : `${SITE_URL}${localized}`;
}

/** hreflang alternates for a page: every language plus x-default (English). */
export function hreflangAlternates(path: string): [hreflang: string, href: string][] {
  return [
    ...SUPPORTED_LANGUAGES.map((lang): [string, string] => [lang, absoluteUrl(path, lang)]),
    ['x-default', absoluteUrl(path, 'en')],
  ];
}

/**
 * For components: the active language plus helpers bound to it, so an
 * internal link reads `<Link to={localize('/about')}>` and stays in the
 * visitor's language.
 */
export function useLocalizedPath() {
  const { i18n } = useTranslation();
  const lang = toLanguage(i18n.language);
  return {
    lang,
    localize: (path: string) => localizePath(path, lang),
    absolute: (path: string) => absoluteUrl(path, lang),
  };
}
