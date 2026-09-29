import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';
import './NotFoundPage.css';

interface NotFoundPageProps {
  /** Where the way back leads — the blog sends readers back to /blog. */
  backTo?: string;
  backLabel?: string;
}

/**
 * The one not-found view for every unknown URL — an unmatched deep path,
 * a single-segment slug that is not a service, or an unknown blog post.
 *
 * It used to be two different things: unknown deep paths rendered the full
 * homepage, and unknown slugs showed a "Service not found" message. Both
 * answered HTTP 200 (Vercel rewrites everything to index.html), so to a
 * crawler each typo was a duplicate homepage or a thin page worth
 * indexing. There is no server to send a real 404, so the page says so
 * the only way a static SPA can: robots "noindex".
 */
export default function NotFoundPage({ backTo = '/', backLabel }: NotFoundPageProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <div className="not-found section-container">
      <SEOHead path={pathname} title={`${t('not_found_title')} | 1618 Digital`} noindex />
      <h1 className="text-silver">{t('not_found_title')}</h1>
      <p>{t('not_found_text')}</p>
      <Link to={backTo} className="premium-button premium-button-silver">
        {backLabel ?? t('not_found_cta')}
      </Link>
    </div>
  );
}
