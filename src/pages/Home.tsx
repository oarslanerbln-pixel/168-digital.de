import Hero from '../components/Hero';
import MarqueeTextBand from '../components/MarqueeTextBand';
import Works from '../components/Works';
import About from '../components/About';
import Services from '../components/Services';
import WebDesignCatalog from '../components/WebDesignCatalog';
import SEOHead from '../components/SEOHead';
import Contact from '../components/Contact';

// Client/brand names, in the same order as the Works section — shown as a
// scrolling banner directly under the Hero as social proof.
const clientNames = [
  'TAKA FISH HOUSE', 'SERA EVENT', 'BOX-X36', 'DÖNER BROS BERLIN', 'IMPULSE PRODUCTION',
];

export default function Home() {
  return (
    <>
      <SEOHead path="/" />
      <Hero />
      {/* Marquee Band #1 — client names banner, directly under Hero, teeing up Works right below */}
      <MarqueeTextBand direction="left" words={clientNames} />
      <div className="section-divider" />
      {/* Works moved up right after the client-names teaser — proof before pitch */}
      <Works />
      <div className="section-divider" />
      <Services />
      {/* Marquee Band #2 — between Services and About, reverse direction */}
      <MarqueeTextBand direction="right" />
      <About />
      <div className="section-divider" />
      <WebDesignCatalog />
      <div className="section-divider" />
      <Contact />
    </>
  );
}
