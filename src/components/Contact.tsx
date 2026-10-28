import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, CheckSquare, Square, Sparkles, Loader2, MessageCircle, Mail, Check } from 'lucide-react';
import { sendLead, leadFallbackLinks, LEAD_EMAIL, LEAD_WHATSAPP_NUMBER } from '../utils/leads';
import { CONTACT_TOPICS, CONTACT_TOPIC_EVENT, type ContactTopic } from '../utils/contactTopic';

/* Field limits. Well above any real inquiry, but they bound what a script
   can push through the form, and they keep the fallback links below
   within the URL lengths WhatsApp and desktop mail clients accept. */
const MAX_NAME = 100;
const MAX_EMAIL = 254; // RFC 5321 path limit
const MAX_MESSAGE = 3000;

interface ContactProps {
  /**
   * Show the "what happens next" column beside the form. On the homepage
   * it is the last reassurance before the ask; /contact has its own intro
   * and direct-contact block above the card, so it opts out.
   */
  withSteps?: boolean;
}

export default function Contact({ withSteps = false }: ContactProps) {
  const { t } = useTranslation();
  const [topic, setTopic] = useState<ContactTopic | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [dsgvoConsent, setDsgvoConsent] = useState(false);
  const [fallback, setFallback] = useState<{ whatsapp: string; mailto: string } | null>(null);

  // A "Ask about a system like this" button elsewhere on the page picks
  // the topic for the visitor — one less decision between interest and
  // a sent inquiry.
  useEffect(() => {
    const onTopic = (e: Event) => setTopic((e as CustomEvent<ContactTopic>).detail);
    window.addEventListener(CONTACT_TOPIC_EVENT, onTopic);
    return () => window.removeEventListener(CONTACT_TOPIC_EVENT, onTopic);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dsgvoConsent || status === 'sending') return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim().replace(/[<>]/g, '');
    const email = String(data.get('email') || '').trim().replace(/[<>]/g, '');
    const typed = String(data.get('message') || '').trim().replace(/[<>]/g, '');
    // The topic travels as a prefix in the message itself, so the inbox
    // shows it at a glance and the lead payload stays unchanged.
    const message = topic ? `[${t(`contact_topic_${topic}`)}] ${typed}` : typed;

    setStatus('sending');
    const delivered = await sendLead({ name, email, message, source: 'Contact Form' });

    if (delivered) {
      setStatus('success');
      setFallback(null);
      form.reset();
      setTopic(null);
      setDsgvoConsent(false);
      setTimeout(() => setStatus('idle'), 6000);
    } else {
      // "Try again" alone is useless when the cause is configuration: the
      // retry fails the same way. Hand the visitor their own text, ready to
      // send through a channel that does not depend on the form backend.
      setFallback(
        leadFallbackLinks(
          t('contact_fallback_body', { name, email, message }),
          t('contact_fallback_subject')
        )
      );
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={`contact-section ${withSteps ? 'contact-section-split' : ''}`}>
      {withSteps && (
        <aside className="contact-aside">
          <h2 className="contact-aside-title">{t('contact_next_title')}</h2>
          <ol className="contact-steps">
            {['contact_next_1', 'contact_next_2', 'contact_next_3'].map((key, i) => (
              <li key={key}>
                <span aria-hidden="true">{i + 1}</span>
                {t(key)}
              </li>
            ))}
          </ol>
          <div className="contact-direct">
            <p>{t('contact_direct_title')}</p>
            <a href={`https://wa.me/${LEAD_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={17} aria-hidden="true" /> WhatsApp
            </a>
            <a href={`mailto:${LEAD_EMAIL}`}>
              <Mail size={17} aria-hidden="true" /> {LEAD_EMAIL}
            </a>
          </div>
        </aside>
      )}
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Card heading. Deliberately its own key (contact_form_title),
            not contact_title: on the homepage this is the only heading
            for the section, but on /contact (ContactPage.tsx) the page
            already has an H1 with that exact text right above this card
            — reusing it here printed "Initiate a Project" twice on the
            same screen. */}
        <div className="contact-header">
          <h2 className="contact-title">{t('contact_form_title', 'Send us a message')}</h2>
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
              <Sparkles size={44} color="var(--accent-cyan)" strokeWidth={1.5} />
            </motion.div>
            <span>{t('contact_success')}</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            {/* Topic chips: real radio inputs (rule 5), optional, and
                deliberately few — they sort the inbox, they are not a
                questionnaire standing between the visitor and "send". */}
            <fieldset className="contact-topics">
              <legend>{t('contact_topic_label')}</legend>
              <div className="contact-topic-list">
                {CONTACT_TOPICS.map((id) => (
                  <label key={id} className={`contact-topic ${topic === id ? 'is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="topic"
                      value={id}
                      checked={topic === id}
                      onChange={() => setTopic(id)}
                    />
                    {topic === id && <Check size={14} aria-hidden="true" />}
                    {t(`contact_topic_${id}`)}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Input Group */}
            <div className="input-group">
              <div className="input-field-wrapper">
                <input
                  required
                  type="text"
                  name="name"
                  maxLength={MAX_NAME}
                  autoComplete="name"
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
                  maxLength={MAX_EMAIL}
                  autoComplete="email"
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
                maxLength={MAX_MESSAGE}
                placeholder=" "
                id="contact-message"
                className="premium-input premium-textarea"
              />
              <label htmlFor="contact-message" className="premium-label">{t('contact_message')}</label>
              <div className="input-focus-border" />
            </div>

            {/* DSGVO Consent.

                A real <input type="checkbox"> rather than a div carrying
                role="checkbox". The div version looked identical but was not
                a form control: it never took part in form validation, screen
                readers announced a widget the browser could not operate, and
                — because the whole row was the click target — tapping the
                "Datenschutz" link inside the label text toggled the consent
                instead of opening the policy. The native control fixes all
                three, and the custom icon is kept purely as decoration. */}
            <div className={`dsgvo-checkbox-wrapper ${dsgvoConsent ? 'active' : ''}`}>
              <input
                required
                type="checkbox"
                id="contact-dsgvo"
                name="dsgvo"
                className="dsgvo-native-checkbox"
                checked={dsgvoConsent}
                onChange={(e) => setDsgvoConsent(e.target.checked)}
              />
              <label htmlFor="contact-dsgvo" className="dsgvo-label">
                <span className="dsgvo-icon" aria-hidden="true">
                  {dsgvoConsent ? (
                    <CheckSquare size={22} color="var(--accent-cyan)" />
                  ) : (
                    <Square size={22} color="rgba(18, 18, 17,0.35)" />
                  )}
                </span>
                <span className="dsgvo-text">{t('contact_dsgvo_consent')}</span>
              </label>
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

            {status === 'error' && fallback && (
              <div className="contact-error" role="alert">
                <p>{t('contact_error')}</p>
                <div className="contact-fallback">
                  <a
                    href={fallback.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-button premium-button-silver"
                  >
                    <MessageCircle size={18} aria-hidden="true" />
                    {t('contact_fallback_whatsapp')}
                  </a>
                  <a href={fallback.mailto} className="premium-button premium-button-glass">
                    <Mail size={18} aria-hidden="true" />
                    {t('contact_fallback_email')}
                  </a>
                </div>
              </div>
            )}
          </form>
        )}
      </motion.div>
    </section>
  );
}
