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

export function initThirdPartyAnalytics() {
  const ga4Id = import.meta.env.VITE_GA4_ID as string | undefined;
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

  if (ga4Id) loadGoogleAnalytics(ga4Id);
  if (metaPixelId) loadMetaPixel(metaPixelId);
}
