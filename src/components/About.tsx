import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

/* ─── Animated Counter ─── */
interface StatHighlightProps {
  label: string;
  sublabel: string;
}

function StatHighlight({ label, sublabel }: StatHighlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="stat-item"
    >
      <div className="stat-value-container">
        <span className="text-silver stat-highlight-label">
          {label}
        </span>
      </div>
      <p className="stat-highlight-sublabel">
        {sublabel}
      </p>
    </motion.div>
  );
}

// Was hardcoded English ("Boutique", "Quality over Volume", …) with no
// t() call at all — German and Turkish visitors saw these four words in
// English regardless of the language they'd picked. Built from i18n keys
// now, inside the component where `t` is available.
const highlightKeys = ['boutique', 'focused', 'tailored', 'elite'] as const;

export default function About() {
  const { t } = useTranslation();
  const highlights = highlightKeys.map((key) => ({
    key,
    label: t(`about_stat_${key}_label`),
    sublabel: t(`about_stat_${key}_sub`),
  }));

  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="about-layout about-layout-text-only"
      >
        {/* Text Details — no visual, text-only per feedback */}
        <div className="about-text-container">
          <h2 className="about-overline">
            {t('about_title')}
          </h2>
          <h3 className="text-silver about-headline">
            {t('about_subtitle')}
          </h3>
          <p className="about-description">
            {t('about_text')}
          </p>
          
          <div className="about-signature">
            <div className="signature-line" />
            <div>
              <p className="text-silver signature-name">
                Ömer Arslaner
              </p>
              <p className="signature-title">
                Digital Architect & Director
              </p>
            </div>
          </div>
        </div>

      </motion.div>

      {/* ─── Premium Value Highlights ─── */}
      <div className="stat-grid">
        {highlights.map((item) => (
          <StatHighlight
            key={item.key}
            label={item.label}
            sublabel={item.sublabel}
          />
        ))}
      </div>
    </section>
  );
}
