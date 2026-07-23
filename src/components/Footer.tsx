import { Link } from 'react-router-dom';
import './Footer.css';

interface FooterProps {
  onOpenCookies: () => void;
}

export default function Footer({ onOpenCookies }: FooterProps) {
  return (
    <footer className="footer-wrapper">
      <div className="footer-copyright">
        © {new Date().getFullYear()} 1618 Digital. Represented by Ömer Arslaner.
      </div>

      <div className="footer-links">
        <Link to="/impressum" className="footer-link">
          Impressum
        </Link>
        <Link to="/datenschutz" className="footer-link">
          Datenschutz
        </Link>
        <button
          onClick={onOpenCookies}
          className="footer-link"
        >
          Cookie Settings
        </button>
      </div>
    </footer>
  );
}
