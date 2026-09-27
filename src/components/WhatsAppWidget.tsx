import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Check, ArrowUpRight } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';
import './WhatsAppWidget.css';

/* Below this width the button becomes a full-width bottom bar instead of a
   corner disc (see the component doc comment for why). Matches the
   breakpoint every other floating widget in the site already uses. */
const MOBILE_BAR_QUERY = '(max-width: 640px)';

export default function WhatsAppWidget() {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [isMobileBar, setIsMobileBar] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_BAR_QUERY).matches
  );

  // Tracks the breakpoint live (not just at mount) so rotating a tablet or
  // resizing a browser window switches layouts without a reload.
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_BAR_QUERY);
    const handleChange = () => setIsMobileBar(mql.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  // Close tooltip on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsExpanded(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close tooltip on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.wa-widget-wrapper')) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const getWhatsAppLink = () => {
    const message = t('wa_message');
    return `https://wa.me/491787277867?text=${encodeURIComponent(message)}`;
  };

  const handleConnectWhatsApp = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playClick();
    window.open(getWhatsAppLink(), '_blank', 'noopener,noreferrer');
  };

  const handleCopyNumber = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    navigator.clipboard.writeText('+491787277867');
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const handleWidgetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // The mobile bar IS the affordance — its label already says "tap to
    // chat", so a tap opens WhatsApp immediately. The tooltip (phone
    // number, copy button) only exists for the desktop/tablet disc, where
    // there's room to offer a second option before committing to a tap.
    if (isMobileBar) {
      handleConnectWhatsApp();
      return;
    }
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      playClick();
      setIsExpanded(prev => !prev);
    } else {
      handleConnectWhatsApp();
    }
  };

  return (
    <div className="wa-widget-wrapper">
      {/* Floating Action Button */}
      <motion.button
        className="wa-floating-btn"
        aria-label="Chat on WhatsApp"
        onClick={handleWidgetClick}
        onMouseEnter={() => {
          // Hover only on desktop
          const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
          if (!isTouch) {
            playTick();
            setIsExpanded(true);
          }
        }}
        onMouseLeave={() => {
          const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
          if (!isTouch) {
            setIsExpanded(false);
          }
        }}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing Green Ambient Glow */}
        <span className="wa-btn-pulse" />
        
        {/* Technical Rotating Frame Line */}
        <span className="wa-btn-frame" />

        {/* WhatsApp Icon */}
        <MessageCircle size={22} className="wa-icon" />

        {/* Online Status Dot Indicator — the circular disc only, hidden
            once CSS turns this into a full-width bar (see .css). */}
        <span className="wa-status-dot" />

        {/* Bar label — the reverse: invisible on the disc, shown once the
            button becomes a full-width mobile bar, where a bare icon isn't
            enough of a call to action. Reuses wa_tap_to_chat, the same
            copy the desktop tooltip's button already uses. */}
        <span className="wa-bar-label">{t('wa_tap_to_chat')}</span>
      </motion.button>

      {/* Expanded Hover/Touch Detail Tooltip */}
      <AnimatePresence>
        {isExpanded && !isMobileBar && (
          <motion.div
            className="wa-detail-tooltip hud-scanline-container"
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => {
              const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
              if (!isTouch) setIsExpanded(true);
            }}
            onMouseLeave={() => {
              const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
              if (!isTouch) setIsExpanded(false);
            }}
          >
            {/* Header info */}
            <div className="wa-tooltip-header">
              <span className="wa-live-tag">{t('wa_operator_online')}</span>
              <span className="wa-tech-id">SYS.REF // WA-49178</span>
            </div>

            {/* Content box */}
            <div className="wa-tooltip-body" onClick={handleConnectWhatsApp}>
              <h4 className="wa-title">1618 DIGITAL</h4>
              <p className="wa-subtitle">{t('wa_quick_connect')}</p>
              
              <div className="wa-link-preview">
                <span className="wa-phone-number">+49 (0) 178 7277867</span>
                <ArrowUpRight size={14} className="wa-arrow" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="wa-tooltip-actions">
              <button className="wa-action-btn wa-chat-now" onClick={handleConnectWhatsApp}>
                {t('wa_tap_to_chat')}
              </button>
              <button 
                className={`wa-action-btn wa-copy-number ${phoneCopied ? 'is-copied' : ''}`} 
                onClick={handleCopyNumber}
              >
                {phoneCopied ? (
                  <>
                    <Check size={12} />
                    {t('wa_copied')}
                  </>
                ) : (
                  t('wa_copy')
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
