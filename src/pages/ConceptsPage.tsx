import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import WebDesignCatalog from '../components/WebDesignCatalog';
import './SubPage.css';

/**
 * ConceptsPage — the 50-concept design library, moved off the homepage.
 *
 * It is the single largest block on the site and it sits *below* the
 * things a first-time visitor actually needs (work, services, contact).
 * On its own route it stays fully browsable for anyone who wants it,
 * without lengthening the homepage for everyone who does not.
 */
export default function ConceptsPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead
        path="/concepts"
        title="50 Premium Web Concepts — 1618 Digital"
      />
      <div className="subpage">
        <div className="subpage-head">
          <Link to="/" className="subpage-back">
            <ArrowLeft size={15} strokeWidth={1.75} aria-hidden="true" />
            {t('back_home', 'Home')}
          </Link>
        </div>
        <WebDesignCatalog />
      </div>
    </>
  );
}
