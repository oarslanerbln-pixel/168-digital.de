/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key for lead delivery. Required for production builds — see .env.example. */
  readonly VITE_WEB3FORMS_KEY?: string;
  /** Google Analytics 4 Measurement ID, e.g. "G-XXXXXXXXXX". Optional — see .env.example. */
  readonly VITE_GA4_ID?: string;
  /** Meta (Facebook/Instagram) Pixel ID. Optional — see .env.example. */
  readonly VITE_META_PIXEL_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
