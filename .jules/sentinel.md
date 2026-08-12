## 2024-07-24 - Hardcoded API Key in Lead Delivery Module
**Vulnerability:** A hardcoded Web3Forms API key (`'d10c80c0-53bb-42bc-8c88-13b634b41996'`) was found in `src/utils/leads.ts`.
**Learning:** Even for "client-side" or seemingly public API keys, embedding them directly in source code exposes them to anyone with read access to the repository, leading to potential quota exhaustion or abuse by unauthorized actors.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_WEB3FORMS_KEY`) with an empty string or secure placeholder fallback instead of hardcoded strings in source code.

## 2025-02-12 - Hardcoded Password Hash in DevConsole
**Vulnerability:** A hardcoded SHA-256 hash (`be5e6f0743c61876367f8984076f802893601f640019ecc32177e33c6ccf161f`) for the weak password '1618' was found in `src/components/DevConsole.tsx`.
**Learning:** Hardcoding a password hash client-side exposes both the authentication mechanism and the hash itself, allowing an attacker to crack weak passwords offline or bypass security entirely.
**Prevention:** Store hashes or authentication tokens in environment variables (`import.meta.env`) and avoid relying on client-side hardcoded secrets for restricted sections.
