## 2024-07-24 - Hardcoded API Key in Lead Delivery Module
**Vulnerability:** A hardcoded Web3Forms API key (`'d10c80c0-53bb-42bc-8c88-13b634b41996'`) was found in `src/utils/leads.ts`.
**Learning:** Even for "client-side" or seemingly public API keys, embedding them directly in source code exposes them to anyone with read access to the repository, leading to potential quota exhaustion or abuse by unauthorized actors.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_WEB3FORMS_KEY`) with an empty string or secure placeholder fallback instead of hardcoded strings in source code.
## 2024-05-31 - [High] Reverse Tabnabbing via window.open
**Vulnerability:** Programmatic reverse tabnabbing vulnerability found where `window.open(url, '_blank')` was used without specifying `noopener,noreferrer` arguments.
**Learning:** React automatically adds `noopener noreferrer` to declarative `<a target="_blank">` tags, but does *not* protect programmatic `window.open` calls.
**Prevention:** Always explicitly provide `'noopener,noreferrer'` as the third argument when using `window.open(url, '_blank')`.
