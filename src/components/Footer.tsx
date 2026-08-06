import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

interface FooterProps {
  onOpenCookies: () => void;
}

export default function Footer({ onOpenCookies }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer className="footer-wrapper">
      <div className="footer-copyright">
        {t('footer_copyright', { year: new Date().getFullYear() })}
      </div>

      <div className="footer-links">
        <Link to="/contact" className="footer-link">
          {t('footer_contact')}
        </Link>
        <a
          href="https://www.instagram.com/1618cinema/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Instagram
        </a>
        <Link to="/impressum" className="footer-link">
          {t('footer_impressum')}
        </Link>
        <Link to="/datenschutz" className="footer-link">
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
