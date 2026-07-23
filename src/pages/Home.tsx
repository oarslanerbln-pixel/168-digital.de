import Hero from '../components/Hero';
import MarqueeTextBand from '../components/MarqueeTextBand';
import Works from '../components/Works';
import About from '../components/About';
import Services from '../components/Services';
import WebDesignCatalog from '../components/WebDesignCatalog';
import SEOHead from '../components/SEOHead';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <SEOHead path="/" />
      <Hero />
      {/* Marquee Band #1 — between Hero and Services */}
      <MarqueeTextBand direction="left" />
      <div className="section-divider" />
      <Services />
      {/* Marquee Band #2 — between Services and About, reverse direction */}
      <MarqueeTextBand direction="right" />
      <About />
      <div className="section-divider" />
      <Works />
      <div className="section-divider" />
      <WebDesignCatalog />
      <div className="section-divider" />
      <Contact />
    </>
  );
}
