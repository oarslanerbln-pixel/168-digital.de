import Hero from '../components/Hero';
import MarqueeTextBand from '../components/MarqueeTextBand';
import Works from '../components/Works';
import Services from '../components/Services';
import SEOHead from '../components/SEOHead';
import Contact from '../components/Contact';
import HomeOutro from '../components/HomeOutro';

/* ════════════════════════════════════════════════════════════════
   HOMEPAGE — four sections, in the order a first-time visitor needs
   them: who we've done it for → what we do → how to start.

   Approach (/about) and the 50-concept design library (/concepts)
   used to sit between Services and Contact. Together they were more
   than half the page's height on a phone, and they pushed the contact
   form far below anything a visitor would realistically scroll to.
   Both now live on their own routes and are linked from HomeOutro
   below, so nothing is lost — the homepage just answers the question
   "what is this?" before it starts elaborating.
   ════════════════════════════════════════════════════════════════ */

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
      {/* The single marquee band left on the page — client names as social
          proof, teeing up the Works section directly below it. */}
      <MarqueeTextBand direction="left" words={clientNames} />
      <Works />
      <div className="section-divider" />
      <Services />
      <div className="section-divider" />
      <Contact />
      {/* Quiet doorways to the two sections that moved off this page. */}
      <HomeOutro />
    </>
  );
}
