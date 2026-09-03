import { useTranslation } from 'react-i18next';
import './LanguageToggle.css';
import { motion } from 'framer-motion';
import { playClick, playTick } from '../utils/audio';

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    playClick();
    const langs = ['en', 'de', 'tr'];
    // Handle cases where language might be en-US
    const currentBaseLang = i18n.language.substring(0, 2).toLowerCase();
    const currentIndex = langs.indexOf(currentBaseLang) !== -1 ? langs.indexOf(currentBaseLang) : 0;
    const nextIndex = (currentIndex + 1) % langs.length;
    i18n.changeLanguage(langs[nextIndex]);
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
