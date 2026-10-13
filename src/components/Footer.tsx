import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';
import { useLocalizedPath } from '../utils/localePath';

interface FooterProps {
  onOpenCookies: () => void;
}

export default function Footer({ onOpenCookies }: FooterProps) {
  const { t } = useTranslation();
  const { localize } = useLocalizedPath();

  return (
    <footer className="footer-wrapper">
      <div className="footer-copyright">
        {t('footer_copyright', { year: new Date().getFullYear() })}
      </div>

      <div className="footer-links">
        <Link to={localize('/contact')} className="footer-link">
          {t('footer_contact')}
        </Link>
        {/* Both of these moved off the homepage onto their own routes; the
            footer keeps them one click away from every page. */}
        <Link to={localize('/about')} className="footer-link">
          {t('nav_about', 'Philosophy')}
        </Link>
        <Link to={localize('/concepts')} className="footer-link">
          {t('nav_concepts', 'Concepts')}
        </Link>
        <Link to={localize('/blog')} className="footer-link">
          {t('footer_blog')}
        </Link>
        <a
          href="https://www.instagram.com/1618cinema/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Instagram
        </a>
        <Link to={localize('/impressum')} className="footer-link">
          {t('footer_impressum')}
        </Link>
        <Link to={localize('/datenschutz')} className="footer-link">
          {t('footer_datenschutz')}
        </Link>
        <button
          onClick={onOpenCookies}
          className="footer-link"
        >
          {t('footer_cookie_settings')}
        </button>
      </div>
    </footer>
  );
}
