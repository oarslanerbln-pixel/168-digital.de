import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CANONICAL_BASE = 'https://1618-digital.de/';
const OG_LOCALES: Record<string, string> = { en: 'en_US', de: 'de_DE', tr: 'tr_TR' };

interface SEOHeadProps {
  /** Page path with leading slash, e.g. "/ai-voice-agents". Defaults to the homepage. */
  path?: string;
  /** Pre-localized title/description overrides for a specific page (skips the meta_title/meta_description i18n keys). */
  title?: string;
  description?: string;
  /** JSON-LD object(s) to inject for this page only (Service, BreadcrumbList, FAQPage, etc). Replaced on every route/language change. */
  jsonLd?: object | object[];
}

/**
 * SEOHead Component
 * Dynamically updates document title, meta description, canonical URL,
 * Open Graph tags and page-specific JSON-LD based on the current route and
 * language, so each page + hreflang variant (?lang=en/de/tr) actually
 * reflects what it claims to search engines.
 */
export default function SEOHead({ path = '/', title, description, jsonLd }: SEOHeadProps) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language.substring(0, 2).toLowerCase();
    const localizedTitle = title ?? t('meta_title');
    const metaDescription = description ?? t('meta_description');
    const pageUrl = path === '/' ? CANONICAL_BASE : `${CANONICAL_BASE}${path.replace(/^\//, '')}`;
    const cleanCanonical = lang === 'en' ? pageUrl : `${pageUrl}?lang=${lang}`;

    document.title = localizedTitle;

    const updateMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    updateMeta('meta[name="description"]', metaDescription);
    updateMeta('meta[property="og:title"]', localizedTitle);
    updateMeta('meta[property="og:description"]', metaDescription);
    updateMeta('meta[property="og:url"]', cleanCanonical);
    updateMeta('meta[property="og:locale"]', OG_LOCALES[lang] ?? OG_LOCALES.en);
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
    addAlternate('en', pageUrl);
    addAlternate('de', `${pageUrl}?lang=de`);
    addAlternate('tr', `${pageUrl}?lang=tr`);
    addAlternate('x-default', pageUrl);

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
