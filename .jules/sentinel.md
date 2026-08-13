## 2024-07-24 - Hardcoded API Key in Lead Delivery Module
**Vulnerability:** A hardcoded Web3Forms API key (`'d10c80c0-53bb-42bc-8c88-13b634b41996'`) was found in `src/utils/leads.ts`.
**Learning:** Even for "client-side" or seemingly public API keys, embedding them directly in source code exposes them to anyone with read access to the repository, leading to potential quota exhaustion or abuse by unauthorized actors.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_WEB3FORMS_KEY`) with an empty string or secure placeholder fallback instead of hardcoded strings in source code.

## 2026-08-13 - Hardcoded Master Hash for Developer Console
**Vulnerability:** A hardcoded master hash was found in `src/components/DevConsole.tsx` for developer authentication.
**Learning:** Hardcoded authentication hashes in frontend components can easily be discovered and bypassed, exposing sensitive development functionality to unauthorized users.
**Prevention:** Critical authentication logic or secrets should always be stored securely in environment variables (e.g., `import.meta.env.VITE_MASTER_HASH`), avoiding hardcoding in source code completely.
