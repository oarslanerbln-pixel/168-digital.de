import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { playTick } from '../utils/audio';
import './HomeLogo.css';

// A persistent, unmistakably clickable way back to the homepage from every
// sub-page (service pages, /contact, /impressum, /datenschutz). Hidden on
// the homepage itself, where the Hero already carries the "1618" mark.
export default function HomeLogo() {
  const location = useLocation();
  if (location.pathname === '/') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="home-logo-wrap"
    >
      <Link
        to="/"
        onMouseEnter={playTick}
        className="home-logo-link"
        aria-label="1618 Digital — back to homepage"
      >
        <span className="home-logo-mark">1618</span>
        <span className="home-logo-label">DIGITAL</span>
      </Link>
    </motion.div>
  );
}
