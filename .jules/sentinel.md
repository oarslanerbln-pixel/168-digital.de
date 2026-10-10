## 2024-07-24 - Hardcoded API Key in Lead Delivery Module
**Vulnerability:** A hardcoded Web3Forms API key (value redacted) was found in `src/utils/leads.ts`.
**Learning:** Even for "client-side" or seemingly public API keys, embedding them directly in source code exposes them to anyone with read access to the repository, leading to potential quota exhaustion or abuse by unauthorized actors.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_WEB3FORMS_KEY`) with an empty string or secure placeholder fallback instead of hardcoded strings in source code.

## 2026-09-03 - [Missing Security Headers in Vercel Config]
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.) in the Vercel deployment configuration (`vercel.json`).
**Learning:** Modern web apps deployed via Vercel often omit basic HTTP security headers by default, exposing the app to risks like clickjacking (if framed) and MIME-type sniffing.
**Prevention:** Always define a `headers` block in `vercel.json` matching `/(.*)` with standard security headers (Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) for defense in depth.

## 2026-09-29 - [Moving a public key to env silently broke lead delivery]
**Incident:** After the Web3Forms key was moved to `VITE_WEB3FORMS_KEY`, the variable was never set in Vercel. Vite inlines `VITE_*` at build time, so the minifier compiled `sendLead()` down to "warn and return false" and the request vanished from the bundle. Production deployed green while the contact form — the site's only conversion path — dropped every inquiry for about nine weeks.
**Learning:** A Web3Forms access key is public by design: any `VITE_*` value ends up in the client bundle anyway, so moving it to an env var hides nothing. Treat it as configuration, not a secret, and never change a configuration contract without making the deploy fail when the configuration is missing.
**Prevention:** `vite.config.ts` fails the Vercel production build without the key, and the contact form offers WhatsApp/email with the visitor's text whenever delivery fails.

## 2026-10-10 - [Missing Content Security Policy]
**Vulnerability:** Missing Content Security Policy (CSP) in `vercel.json`.
**Learning:** The application lacked a CSP, which is a critical defense-in-depth mechanism to mitigate Cross-Site Scripting (XSS) and other code injection attacks.
**Prevention:** Added a baseline `Content-Security-Policy` header in `vercel.json` to restrict the sources from which scripts, styles, images, and other resources can be loaded.
