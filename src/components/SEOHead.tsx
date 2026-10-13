import { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { OG_LOCALES, absoluteUrl, hreflangAlternates, toLanguage } from '../utils/localePath';

/** Everything a page says about itself in <head>, resolved for one language. */
export interface SeoData {
  lang: string;
  title: string;
  description: string;
  /** Canonical URL for this language (bare path for English, /de/… or /tr/… otherwise). */
  canonical: string;
  /** [hreflang, href] pairs: every language of this page plus x-default. */
  alternates: [string, string][];
  noindex: boolean;
  jsonLd: object[];
}

/**
 * Build-time prerendering (scripts/prerender.mjs) provides one of these per
 * rendered route. Effects never run during a server render, so SEOHead
 * reports its resolved values here instead and the prerender script writes
 * them into that route's static HTML. In the browser there is no provider
 * and nothing changes: the effect below still owns <head>.
 */
export const SeoCollectorContext = createContext<((data: SeoData) => void) | null>(null);

interface SEOHeadProps {
  /** Language-neutral page path with leading slash, e.g. "/video-drone-production". Defaults to the homepage. */
  path?: string;
  /** Pre-localized title/description overrides for a specific page (skips the meta_title/meta_description i18n keys). */
  title?: string;
  description?: string;
  /** JSON-LD object(s) to inject for this page only (Service, BreadcrumbList, FAQPage, etc). Replaced on every route/language change. */
  jsonLd?: object | object[];
  /**
   * Mark the page as not indexable. Used by the not-found view: Vercel
   * rewrites every path to index.html with HTTP 200, so without this a
   * mistyped URL reads to Google as a real page (a "soft 404").
   */
  noindex?: boolean;
}

/**
 * SEOHead Component
 * Dynamically updates document title, meta description, canonical URL,
 * Open Graph tags and page-specific JSON-LD based on the current route and
 * language, so each page + hreflang variant (/, /de/, /tr/) actually
 * reflects what it claims to search engines.
 */
export default function SEOHead({ path = '/', title, description, jsonLd, noindex = false }: SEOHeadProps) {
  const { t, i18n } = useTranslation();
  const collect = useContext(SeoCollectorContext);

  if (collect) {
    const lang = toLanguage(i18n.language);
    collect({
      lang,
      title: title ?? t('meta_title'),
      description: description ?? t('meta_description'),
      canonical: absoluteUrl(path, lang),
      alternates: hreflangAlternates(path),
      noindex,
      jsonLd: jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [],
    });
  }

  // Its own effect with a cleanup, so the flag is lifted the moment the
  // not-found view unmounts — the next page never inherits "noindex".
  useEffect(() => {
    if (!noindex) return;
    const robots = document.querySelector('meta[name="robots"]');
    const previous = robots?.getAttribute('content') ?? 'index, follow';
    robots?.setAttribute('content', 'noindex, follow');
    return () => robots?.setAttribute('content', previous);
  }, [noindex]);

  useEffect(() => {
    const lang = toLanguage(i18n.language);
    const localizedTitle = title ?? t('meta_title');
    const metaDescription = description ?? t('meta_description');
    const cleanCanonical = absoluteUrl(path, lang);

    document.title = localizedTitle;

    const updateMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    updateMeta('meta[name="description"]', metaDescription);
    updateMeta('meta[property="og:title"]', localizedTitle);
    updateMeta('meta[property="og:description"]', metaDescription);
    updateMeta('meta[property="og:url"]', cleanCanonical);
    updateMeta('meta[property="og:locale"]', OG_LOCALES[lang]);
    updateMeta('meta[property="twitter:title"]', localizedTitle);
    updateMeta('meta[property="twitter:description"]', metaDescription);
    updateMeta('meta[property="twitter:url"]', cleanCanonical);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', cleanCanonical);

    // hreflang alternates must point at this same page for every supported language.
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    const head = document.head;
    const addAlternate = (hreflang: string, href: string) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', href);
      head.appendChild(link);
    };
    hreflangAlternates(path).forEach(([hreflang, href]) => addAlternate(hreflang, href));

    // og:locale:alternate should list every supported locale except the active one.
    document.querySelectorAll('meta[property="og:locale:alternate"]').forEach((el) => el.remove());
    Object.entries(OG_LOCALES)
      .filter(([code]) => code !== lang)
      .forEach(([, locale]) => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:locale:alternate');
        meta.setAttribute('content', locale);
        document.head.appendChild(meta);
      });

    // Page-specific JSON-LD (Service, BreadcrumbList, FAQPage...) — replaced on every navigation.
    document.querySelectorAll('script[data-page-jsonld]').forEach((el) => el.remove());
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((item) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-page-jsonld', 'true');
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
      });
    }

    document.documentElement.lang = lang;
  }, [t, i18n.language, path, title, description, jsonLd]);

  return null; // This component handles side effects, no UI to render
}
