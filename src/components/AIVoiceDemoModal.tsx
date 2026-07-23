import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { playClick, playTick } from '../utils/audio';
import { useEscapeToClose } from '../hooks/useEscapeToClose';
import './AIVoiceDemoModal.css';

interface AIVoiceDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIVoiceDemoModal({ isOpen, onClose }: AIVoiceDemoModalProps) {
  const { i18n } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening'>('idle');

  useEffect(() => {
    if (isOpen) {
      setStatus('connecting');
      const timer = setTimeout(() => {
        setStatus('listening');
        playTick();
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setStatus('idle');
    }
  }, [isOpen]);

  const handleClose = () => {
    playClick();
    onClose();
  };

  useEscapeToClose(isOpen, handleClose);

  const connectingText = i18n.language === 'de' ? 'Verbindung zum KI-Kern...' : (i18n.language === 'tr' ? 'Yapay Zeka Core Bağlanıyor...' : 'Connecting to AI Core...');
  const listeningText = i18n.language === 'de' ? 'Ich höre zu...' : (i18n.language === 'tr' ? 'Dinliyorum...' : 'I am listening...');
  const speakText = i18n.language === 'de' ? 'Sprechen Sie jetzt' : (i18n.language === 'tr' ? 'Şimdi Konuşun' : 'Speak to AI Agent');
  const standbyText = i18n.language === 'de' ? 'Standby' : (i18n.language === 'tr' ? 'Bekleniyor' : 'Standby');
  const endCallText = i18n.language === 'de' ? 'Übertragung beenden' : (i18n.language === 'tr' ? 'Bağlantıyı Sonlandır' : 'End Transmission');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="ai-voice-overlay">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ai-voice-backdrop"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="ai-voice-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-voice-modal-title"
          >
            <div className="ai-voice-ambient-glow" />

            <button
              onClick={handleClose}
              onMouseEnter={playTick}
              className="ai-voice-close"
              aria-label="Close voice demo"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* Central Orb / Visualizer */}
            <div className="ai-voice-visualizer">
              {status === 'connecting' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="ai-voice-ring"
                />
              )}
              {status === 'listening' && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="ai-voice-pulse"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="ai-voice-mic-container"
                  >
                    <Activity size={32} />
                  </motion.div>
                </>
              )}
              {status === 'idle' && (
                <div className="ai-voice-mic-container" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <Mic size={32} style={{ color: 'rgba(255,255,255,0.3)' }} />
                </div>
              )}
            </div>

            {/* Status Text */}
            <div className="ai-voice-status-text">
              <h3 id="ai-voice-modal-title" className="ai-voice-title">
                {status === 'connecting' && connectingText}
                {status === 'listening' && listeningText}
              </h3>
              <p className="ai-voice-subtitle">
                {status === 'listening' ? speakText : standbyText}
              </p>
            </div>

            {/* End Call Button */}
            {status === 'listening' && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleClose}
                className="ai-voice-end-btn"
              >
                {endCallText}
              </motion.button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
