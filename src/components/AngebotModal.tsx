import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { X, Send, CheckSquare, Square, Sparkles, Loader2 } from 'lucide-react';
import { sendLead } from '../utils/leads';
import { services } from '../data/services';
import { useEscapeToClose } from '../hooks/useEscapeToClose';
import { playClose } from '../utils/audio';
import './AngebotWidget.css';

interface AngebotModalProps {
  onClose: () => void;
}

export default function AngebotModal({ onClose }: AngebotModalProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [dsgvoConsent, setDsgvoConsent] = useState(false);

  const handleClose = () => {
    playClose();
    onClose();
  };

  useEscapeToClose(true, handleClose);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dsgvoConsent || status === 'sending') return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const service = String(data.get('service') || '').trim();
    const details = String(data.get('message') || '').trim();
    const message = service ? `Service: ${service}\n\n${details}` : details;

    setStatus('sending');
    const delivered = await sendLead({ name, email, message, source: 'Angebot Form' });

    if (delivered) {
      setStatus('success');
      form.reset();
      setDsgvoConsent(false);
    } else {
      setStatus('error');
    }
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        className="angebot-modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="angebot-modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn angebot-close-btn" onClick={handleClose} aria-label="Close">
          <X size={20} />
        </button>

        <h2 id="angebot-modal-title" className="angebot-modal-title">{t('angebot_modal_title')}</h2>
        <p className="angebot-modal-subtitle">{t('angebot_modal_subtitle')}</p>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="contact-success"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles size={44} />
            </motion.div>
            <span>{t('contact_success')}</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="input-group">
              <div className="input-field-wrapper">
                <input required type="text" name="name" placeholder=" " id="angebot-name" className="premium-input" />
                <label htmlFor="angebot-name" className="premium-label">{t('contact_name')}</label>
                <div className="input-focus-border" />
              </div>
              <div className="input-field-wrapper">
                <input required type="email" name="email" placeholder=" " id="angebot-email" className="premium-input" />
                <label htmlFor="angebot-email" className="premium-label">{t('contact_email')}</label>
                <div className="input-focus-border" />
              </div>
            </div>

            <div className="angebot-select-wrapper">
              <label htmlFor="angebot-service" className="angebot-select-label">{t('angebot_service_label')}</label>
              <select required name="service" id="angebot-service" className="angebot-select" defaultValue="">
                <option value="" disabled>{t('angebot_service_placeholder')}</option>
                {services.map((s) => (
                  <option key={s.slug} value={t(s.titleKey)}>{t(s.titleKey)}</option>
                ))}
              </select>
            </div>

            <div className="input-field-wrapper">
              <textarea rows={4} name="message" placeholder=" " id="angebot-message" className="premium-input premium-textarea" />
              <label htmlFor="angebot-message" className="premium-label">{t('contact_message')}</label>
              <div className="input-focus-border" />
            </div>

            <div
              className={`dsgvo-checkbox-wrapper ${dsgvoConsent ? 'active' : ''}`}
              onClick={() => setDsgvoConsent(!dsgvoConsent)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setDsgvoConsent(!dsgvoConsent);
                }
              }}
              role="checkbox"
              aria-checked={dsgvoConsent}
              tabIndex={0}
            >
              <div className="dsgvo-icon">
                {dsgvoConsent ? (
                  <CheckSquare size={22} color="var(--accent-cyan)" />
                ) : (
                  <Square size={22} color="rgba(18, 18, 17,0.35)" />
                )}
              </div>
              <p className="dsgvo-text">{t('contact_dsgvo_consent')}</p>
            </div>

            <motion.button
              whileHover={{ scale: dsgvoConsent && status !== 'sending' ? 1.02 : 1 }}
              whileTap={{ scale: dsgvoConsent && status !== 'sending' ? 0.98 : 1 }}
              type="submit"
              disabled={!dsgvoConsent || status === 'sending'}
              className={`submit-button ${dsgvoConsent ? 'active' : ''}`}
            >
              {dsgvoConsent && status !== 'sending' && <div className="submit-shimmer" />}
              <span className="submit-text">
                {status === 'sending' ? t('contact_sending') : t('contact_send')}
              </span>
              {status === 'sending' ? (
                <Loader2 size={20} className="submit-icon spin" />
              ) : (
                <Send size={20} className="submit-icon" />
              )}
            </motion.button>

            {status === 'error' && <p className="contact-error">{t('contact_error')}</p>}
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
