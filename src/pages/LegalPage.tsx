import { useLocation, Navigate, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { legalContent } from '../data/legalContent';
import './LegalPage.css';

export default function LegalPage() {
  const { pathname } = useLocation();
  const type = pathname.replace(/^\//, '') as 'impressum' | 'datenschutz';

  if (type !== 'impressum' && type !== 'datenschutz') {
    return <Navigate to="/" replace />;
  }

  const content = legalContent[type];

  return (
    <>
      <SEOHead path={`/${type}`} title={`${content.title} | 1618 Digital`} />
      <section className="legal-page section-container">
        <nav className="legal-page-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>{content.title}</span>
        </nav>
        <h1 className="text-silver legal-page-title">{content.title}</h1>
        <div className="legal-page-content">{content.text}</div>
      </section>
    </>
  );
}
