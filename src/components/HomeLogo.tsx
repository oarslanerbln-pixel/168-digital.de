import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { playTick } from '../utils/audio';
import './HomeLogo.css';

// The site's persistent wordmark, top centre — and on every sub-page, a
// clickable way back to the homepage.
//
// It used to hide itself on "/" because the Hero carried a large rotating
// "1618" emblem there. That emblem has been removed (a 400px SVG scaled to
// 0.45 rendered visibly soft, and its spinning spiral, corner brackets and
// floating dust were the busiest thing on an otherwise quiet page), so the
// mark now shows on the homepage too. Together with the language toggle
// (top left) and the menu button (top right) it forms a plain three-point
// header.
export default function HomeLogo() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="home-logo-wrap"
      /* On the homepage the mark is decorative — the hero states who we
         are directly underneath it — so it is hidden from screen readers
         there to avoid a redundant "1618 Digital, link" announcement. */
      aria-hidden={isHome || undefined}
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
