## 2024-07-24 - Hardcoded API Key in Lead Delivery Module
**Vulnerability:** A hardcoded Web3Forms API key (`'d10c80c0-53bb-42bc-8c88-13b634b41996'`) was found in `src/utils/leads.ts`.
**Learning:** Even for "client-side" or seemingly public API keys, embedding them directly in source code exposes them to anyone with read access to the repository, leading to potential quota exhaustion or abuse by unauthorized actors.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_WEB3FORMS_KEY`) with an empty string or secure placeholder fallback instead of hardcoded strings in source code.

## 2025-02-18 - Missing Security Headers in Vercel Deployment
**Vulnerability:** The application was deployed via Vercel without standard HTTP security headers (e.g., Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options), leaving it potentially vulnerable to clickjacking, MIME-sniffing, and downgrade attacks.
**Learning:** Vercel doesn't automatically apply these strict headers by default. For statically hosted sites or SPA deployments without an explicit backend framework managing headers, they must be manually configured at the infrastructure level (e.g., in `vercel.json`).
**Prevention:** Always include a comprehensive `"headers"` configuration block in the deployment manifest (`vercel.json`, `netlify.toml`, etc.) to enforce security headers across all routes.
