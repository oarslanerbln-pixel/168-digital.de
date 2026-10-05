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

## 2024-05-20 - [Missing Server-Side Validation Equivalent on API Request]
**Vulnerability:** Lack of programmatic limits on the lead payload structure before dispatching requests to a third-party service (Web3Forms).
**Learning:** Even with HTML5 form validation (`maxLength`, `required`, `type="email"`), an attacker can easily bypass the UI and programmatically hit the Web3Forms API endpoint via the exposed frontend function (`sendLead`), sending massive payloads or invalid email strings which could cause errors, exhaust quotas, or result in malformed data logic.
**Prevention:** Always implement programmatic input validation (length limits and RegEx pattern matching) inside the request dispatcher function, even on the client side, to enforce defense in depth prior to firing the request.
