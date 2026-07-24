import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';
import AngebotModal from './AngebotModal';
import './AngebotWidget.css';

// A persistent, unmistakably clickable corner button that opens a
// quote-request form. Sits opposite the WhatsApp widget (bottom-right).
export default function AngebotWidget() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        className="angebot-fab"
        onClick={() => { playClick(); setIsOpen(true); }}
        onMouseEnter={playTick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label={t('angebot_button_label')}
      >
        <FileText size={18} />
        <span className="angebot-fab-label">{t('angebot_button_label')}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && <AngebotModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
