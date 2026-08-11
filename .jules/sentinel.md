## 2024-07-24 - Hardcoded API Key in Lead Delivery Module
**Vulnerability:** A hardcoded Web3Forms API key (`'d10c80c0-53bb-42bc-8c88-13b634b41996'`) was found in `src/utils/leads.ts`.
**Learning:** Even for "client-side" or seemingly public API keys, embedding them directly in source code exposes them to anyone with read access to the repository, leading to potential quota exhaustion or abuse by unauthorized actors.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_WEB3FORMS_KEY`) with an empty string or secure placeholder fallback instead of hardcoded strings in source code.

## 2026-08-11 - Reverse Tabnabbing Vulnerability in window.open
**Vulnerability:** `window.open` was used to open external URLs with `_blank` but without `noopener,noreferrer` in `src/components/Hero.tsx` and `src/components/WhatsAppWidget.tsx`.
**Learning:** The newly opened window will have a reference to the original window (via `window.opener`), which allows the target page to change the original page's URL via `window.opener.location`, causing reverse tabnabbing and phishing attacks.
**Prevention:** Always add `'noopener,noreferrer'` as a third argument to `window.open` when opening external pages or untrusted links.
