import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { playClick } from '../utils/audio';
import { legalContent } from '../data/legalContent';
import './LegalModal.css';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'impressum' | 'datenschutz' | null;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!isOpen || !type) return null;

  const activeContent = legalContent[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="legal-modal-overlay"
        onClick={() => {
          playClick();
          onClose();
        }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="legal-modal-container"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            aria-label="Close modal"
            onClick={() => {
              playClick();
              onClose();
            }}
            className="legal-modal-close-btn"
          >
            <X size={20} />
          </button>

          <h2 className="legal-modal-title">
            {activeContent.title}
          </h2>

          <div className="legal-modal-content">
            {activeContent.text}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
