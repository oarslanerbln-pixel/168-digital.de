import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { SUPPORTED_LANGUAGES, localizePath, toLanguage } from '../utils/localePath';
import './LanguageToggle.css';
import { motion } from 'framer-motion';
import { playClick, playTick } from '../utils/audio';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  // The language lives in the URL, so switching it means going to the same
  // page under the next language's path; App's LanguageRouting follows.
  const toggleLanguage = () => {
    playClick();
    const current = SUPPORTED_LANGUAGES.indexOf(toLanguage(i18n.language));
    const next = SUPPORTED_LANGUAGES[(current + 1) % SUPPORTED_LANGUAGES.length];
    navigate(`${localizePath(pathname, next)}${search}${hash}`);
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={playTick}
      onClick={toggleLanguage}
      className="lang-toggle-btn"
      aria-label={`Language: ${i18n.language.substring(0, 2).toUpperCase()}`}
    >
      {i18n.language.substring(0, 2).toUpperCase()}
    </motion.button>
  );
}
