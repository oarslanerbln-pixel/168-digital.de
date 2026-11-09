/* ════════════════════════════════════════════════════════════════
   Third-party measurement (Google Analytics 4 + Meta Pixel).

   Both are opt-in only: they are injected exactly once, only when
   isAnalyticsAllowed() is true (user clicked "Accept All" in the cookie
   banner) AND the corresponding ID is configured via env var. Missing an
   ID just silently skips that provider — no placeholder/test IDs are
   ever sent.

   Configure via .env.local (see .env.example):
     VITE_GA4_ID=G-XXXXXXXXXX
     VITE_META_PIXEL_ID=XXXXXXXXXXXXXXX
   ════════════════════════════════════════════════════════════════ */

/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: any;
    _fbq?: any;
  }
}

function loadGoogleAnalytics(measurementId: string) {
  if (document.getElementById('ga4-script')) return; // already injected

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  // Google Signals stays off to keep this conservative for a DE audience.
  window.gtag('config', measurementId, { allow_google_signals: false });
}

function loadMetaPixel(pixelId: string) {
  if (window.fbq) return; // already injected

  // Standard Meta Pixel base snippet, translated 1:1 from Meta's own
  // boilerplate (see business.facebook.com/events_manager).
  const fbq: any = function (...args: unknown[]) {
    fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
  };
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
}

/* ─── Inquiries as conversions ───────────────────────────────────
   The site exists to produce inquiries, yet analytics only ever saw
   page views: nobody could tell which page or service actually brought
   a lead. Every inquiry intent is now reported as one event:

   - form      → GA4 `generate_lead`, Meta `Lead` (sent by Contact.tsx
                 once the form backend has accepted the message);
   - whatsapp, email, phone → GA4 `contact`, Meta `Contact` (any click on
                 a wa.me / mailto: / tel: link, picked up by one delegated
                 listener, so no button anywhere has to remember to report
                 itself and new links are covered automatically).

   Both providers only exist after consent (see initThirdPartyAnalytics),
   so before that — and for everyone who declines — trackLead is a no-op
   and nothing is collected. Only the channel, the page path and an
   optional topic are sent: never names, e-mail addresses or message
   text. In GA4, mark `generate_lead` (and `contact` if wanted) as a key
   event to see it in the conversion reports.
   ──────────────────────────────────────────────────────────────── */

export type LeadChannel = 'form' | 'whatsapp' | 'email' | 'phone';

export function trackLead(channel: LeadChannel, topic?: string) {
  if (typeof window === 'undefined') return;
  const params = {
    method: channel,
    page_path: window.location.pathname,
    ...(topic ? { topic } : {}),
  };
  window.gtag?.('event', channel === 'form' ? 'generate_lead' : 'contact', params);
  window.fbq?.('track', channel === 'form' ? 'Lead' : 'Contact', { content_category: channel });
}

/** The inquiry channel a link opens, if it opens one. */
export function leadChannelOf(href: string): LeadChannel | null {
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) return 'whatsapp';
  if (/^mailto:/i.test(href)) return 'email';
  if (/^tel:/i.test(href)) return 'phone';
  return null;
}

let linkTrackingInstalled = false;

function installLeadLinkTracking() {
  if (linkTrackingInstalled) return;
  linkTrackingInstalled = true;
  // Capture phase: still sees clicks whose handlers stop propagation.
  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element | null)?.closest?.('a[href]');
      const channel = link ? leadChannelOf(link.getAttribute('href') ?? '') : null;
      if (channel) trackLead(channel);
    },
    { capture: true }
  );
}

export function initThirdPartyAnalytics() {
  const ga4Id = import.meta.env.VITE_GA4_ID as string | undefined;
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

  if (ga4Id) loadGoogleAnalytics(ga4Id);
  if (metaPixelId) loadMetaPixel(metaPixelId);
  if (ga4Id || metaPixelId) installLeadLinkTracking();
}
