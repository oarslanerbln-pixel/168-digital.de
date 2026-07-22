import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CANONICAL_BASE = 'https://1618-digital.de/';
const OG_LOCALES: Record<string, string> = { en: 'en_US', de: 'de_DE', tr: 'tr_TR' };

/**
 * SEOHead Component
 * Dynamically updates document title, meta description, canonical URL and
 * Open Graph tags based on the current language, so each hreflang variant
 * (?lang=en/de/tr) actually reflects what it claims to search engines.
 */
export default function SEOHead() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language.substring(0, 2).toLowerCase();
    const localizedTitle = t('meta_title'); // already includes the "1618 Digital" brand prefix
    const description = t('meta_description');
    const canonicalUrl = lang === 'en' ? CANONICAL_BASE : `${CANONICAL_BASE}?lang=${lang}`;

    document.title = localizedTitle;

    const updateMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:title"]', localizedTitle);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:url"]', canonicalUrl);
    updateMeta('meta[property="og:locale"]', OG_LOCALES[lang] ?? OG_LOCALES.en);
    updateMeta('meta[property="twitter:title"]', localizedTitle);
    updateMeta('meta[property="twitter:description"]', description);
    updateMeta('meta[property="twitter:url"]', canonicalUrl);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', canonicalUrl);

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

    document.documentElement.lang = lang;
  }, [t, i18n.language]);

  return null; // This component handles side effects, no UI to render
}
