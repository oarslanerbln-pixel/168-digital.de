## 2024-07-24 - Hardcoded API Key in Lead Delivery Module
**Vulnerability:** A hardcoded Web3Forms API key (`'d10c80c0-53bb-42bc-8c88-13b634b41996'`) was found in `src/utils/leads.ts`.
**Learning:** Even for "client-side" or seemingly public API keys, embedding them directly in source code exposes them to anyone with read access to the repository, leading to potential quota exhaustion or abuse by unauthorized actors.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_WEB3FORMS_KEY`) with an empty string or secure placeholder fallback instead of hardcoded strings in source code.

## 2024-08-21 - Missing Security Headers in Vercel Deployment
**Vulnerability:** The Vercel deployment lacked standard HTTP security headers (e.g., `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`), leaving the site open to clickjacking, MIME-sniffing, and XSS attacks.
**Learning:** Even static site deployments require explicit security headers configured at the edge to ensure basic protections are in place across all responses.
**Prevention:** Always include a security headers configuration in `vercel.json` (or the respective hosting platform's config) for all routes to enforce defense-in-depth protections.
