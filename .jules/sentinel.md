## 2024-07-24 - Hardcoded API Key in Lead Delivery Module
**Vulnerability:** A hardcoded Web3Forms API key (`'d10c80c0-53bb-42bc-8c88-13b634b41996'`) was found in `src/utils/leads.ts`.
**Learning:** Even for "client-side" or seemingly public API keys, embedding them directly in source code exposes them to anyone with read access to the repository, leading to potential quota exhaustion or abuse by unauthorized actors.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_WEB3FORMS_KEY`) with an empty string or secure placeholder fallback instead of hardcoded strings in source code.

## 2024-08-23 - Missing Security Headers
**Vulnerability:** Missing security headers in `vercel.json` like HSTS, X-Frame-Options, X-Content-Type-Options.
**Learning:** These headers provide defense in depth and mitigate classes of attacks like Clickjacking, MIME-type sniffing, and enforce secure communication over HTTPS.
**Prevention:** Include standard security headers in your hosting configuration (`vercel.json`) by default.
