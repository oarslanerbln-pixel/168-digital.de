import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, CheckSquare, Square, Sparkles, Loader2 } from 'lucide-react';
import { sendLead } from '../utils/leads';

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [dsgvoConsent, setDsgvoConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dsgvoConsent || status === 'sending') return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    setStatus('sending');
    const delivered = await sendLead({ name, email, message, source: 'Contact Form' });

    if (delivered) {
      setStatus('success');
      form.reset();
      setDsgvoConsent(false);
      setTimeout(() => setStatus('idle'), 6000);
    } else {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Holographic Header */}
        <div className="contact-header">
          <h2 className="contact-title">{t('contact_title')}</h2>
          <div className="contact-decorative-line" />
        </div>

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
              <Sparkles size={52} />
            </motion.div>
            <span>{t('contact_success')}</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            
            {/* Input Group */}
            <div className="input-group">
              <div className="input-field-wrapper">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder=" "
                  id="contact-name"
                  className="premium-input"
                />
                <label htmlFor="contact-name" className="premium-label">{t('contact_name')}</label>
                <div className="input-focus-border" />
              </div>

              <div className="input-field-wrapper">
                <input
                  required
                  type="email"
                  name="email"
                  placeholder=" "
                  id="contact-email"
                  className="premium-input"
                />
                <label htmlFor="contact-email" className="premium-label">{t('contact_email')}</label>
                <div className="input-focus-border" />
              </div>
            </div>

            {/* Textarea */}
            <div className="input-field-wrapper">
              <textarea
                required
                rows={5}
                name="message"
                placeholder=" "
                id="contact-message"
                className="premium-input premium-textarea"
              />
              <label htmlFor="contact-message" className="premium-label">{t('contact_message')}</label>
              <div className="input-focus-border" />
            </div>

            {/* DSGVO Consent */}
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
              <p className="dsgvo-text">
                {t('contact_dsgvo_consent')}
              </p>
            </div>

            {/* Submit Button */}
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

            {status === 'error' && (
              <p className="contact-error">{t('contact_error')}</p>
            )}
          </form>
        )}
      </motion.div>
    </section>
  );
}
