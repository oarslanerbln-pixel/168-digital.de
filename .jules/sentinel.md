## 2024-07-24 - Hardcoded API Key in Lead Delivery Module
**Vulnerability:** A hardcoded Web3Forms API key (`'d10c80c0-53bb-42bc-8c88-13b634b41996'`) was found in `src/utils/leads.ts`.
**Learning:** Even for "client-side" or seemingly public API keys, embedding them directly in source code exposes them to anyone with read access to the repository, leading to potential quota exhaustion or abuse by unauthorized actors.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_WEB3FORMS_KEY`) with an empty string or secure placeholder fallback instead of hardcoded strings in source code.

## 2026-09-03 - [Missing Security Headers in Vercel Config]
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.) in the Vercel deployment configuration (`vercel.json`).
**Learning:** Modern web apps deployed via Vercel often omit basic HTTP security headers by default, exposing the app to risks like clickjacking (if framed) and MIME-type sniffing.
**Prevention:** Always define a `headers` block in `vercel.json` matching `/(.*)` with standard security headers (Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) for defense in depth.

## 2026-09-13 - [Security Enhancement: Client-side Email Validation]
**Vulnerability:** Contact form allowed any string to be sent to Web3Forms API without email format verification.
**Learning:** React client forms without robust server-side validation require client-side defense in depth. `package-lock.json` modifications via `npm install` on an agent's environment can cause severe cross-platform dependency issues.
**Prevention:** Avoid running `npm install` and committing `package-lock.json` without verifying changes to ensure other architectures' dependencies are not removed.
