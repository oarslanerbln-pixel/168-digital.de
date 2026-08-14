/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Analytics 4 Measurement ID, e.g. "G-XXXXXXXXXX". Optional — see .env.example. */
  readonly VITE_GA4_ID?: string;
  /** Meta (Facebook/Instagram) Pixel ID. Optional — see .env.example. */
  readonly VITE_META_PIXEL_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
