import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import MarqueeTextBand from '../components/MarqueeTextBand';
import Solutions from '../components/Solutions';
import Works from '../components/Works';
import Process from '../components/Process';
import Services from '../components/Services';
import FactsStrip from '../components/FactsStrip';
import Reel from '../components/Reel';
import Showroom from '../components/Showroom';
import HomeFAQ from '../components/HomeFAQ';
import SEOHead from '../components/SEOHead';
import Contact from '../components/Contact';
import HomeOutro from '../components/HomeOutro';
import { getHomeContent } from '../data/homeContent';

/* ════════════════════════════════════════════════════════════════
   HOMEPAGE — built as one argument that ends in an inquiry.

   1. Hero        what you get + the ask (form / WhatsApp)
   2. Clients     who already trusts us
   3. Facts       four numbers we can back up, counting up
   4. Services    everything we offer, as the page's anchor — moved up
                  from position 6 so "what do you do?" is answered first
   5. Solutions   the systems we build, in use, each with its own ask
   6. Works       real projects
   7. Process     how it runs, what it costs to start, mid-page ask
   8. Showreel    proof for the film services
   9. Showroom    proof of craft
  10. FAQ         last objections (also FAQPage JSON-LD)
  11. Contact     form with "what happens next"

   Every section between the hero and the form either removes a doubt
   or carries its own button to the form, so a visitor never has to
   scroll to the bottom to act. Philosophy (/about) and the concept
   library (/concepts) stay on their own routes, linked from HomeOutro.
   ════════════════════════════════════════════════════════════════ */

// Client/brand names, in the same order as the Works section — shown as a
// scrolling banner directly under the Hero as social proof.
const clientNames = [
  'TAKA FISH HOUSE', 'SERA EVENT', 'BOX-X36', 'DÖNER BROS BERLIN', 'IMPULSE PRODUCTION',
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const { faq } = getHomeContent(i18n.language);

  // The same questions and answers the FAQ section renders, so what
  // search engines and AI assistants quote always matches the page.
  const faqJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    }),
    [faq]
  );

  return (
    <>
      <SEOHead path="/" jsonLd={faqJsonLd} />
      <Hero />
      <MarqueeTextBand direction="left" words={clientNames} />
      <FactsStrip />
      <Services />
      <Solutions />
      <Works />
      <Process />
      {/* The showreel sits right under the film services it proves.
          Reel lazy-loads its video only once it scrolls into view. */}
      <section className="reel-section home-reel" aria-labelledby="home-reel-title">
        <header className="home-section-header">
          <span className="home-overline">{t('hero_reel_label')}</span>
          <h2 id="home-reel-title" className="home-title">{t('reel_title')}</h2>
        </header>
        <Reel />
      </section>
      <Showroom />
      <HomeFAQ />
      <Contact withSteps />
      <HomeOutro />
    </>
  );
}
