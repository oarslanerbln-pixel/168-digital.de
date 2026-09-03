import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import About from '../components/About';
import './SubPage.css';

/**
 * AboutPage — the studio's philosophy and figures, moved off the homepage.
 *
 * The homepage was ~10,600px tall on a phone and read as "a lot" rather
 * than as a clear offer. This content is unchanged and still crawlable at
 * its own URL; it is simply no longer in the way of someone who landed on
 * the site to find out what we do and how to reach us.
 */
export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Was t('about_headline', …) — a key that doesn't exist anywhere in
          i18n.ts, so the browser tab title silently fell back to its
          hardcoded English default in every language. about_subtitle is
          the key About.tsx actually renders as the on-page headline. */}
      <SEOHead
        path="/about"
        title={`${t('about_subtitle', 'Ratio. Judgment.')} — 1618 Digital`}
      />
      <div className="subpage">
        <div className="subpage-head">
          <Link to="/" className="subpage-back">
            <ArrowLeft size={15} strokeWidth={1.75} aria-hidden="true" />
            {t('back_home', 'Home')}
          </Link>
        </div>
        <About />
      </div>
    </>
  );
}
