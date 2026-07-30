## 2024-07-24 - Hardcoded API Key in Lead Delivery Module
**Vulnerability:** A hardcoded Web3Forms API key (`'d10c80c0-53bb-42bc-8c88-13b634b41996'`) was found in `src/utils/leads.ts`.
**Learning:** Even for "client-side" or seemingly public API keys, embedding them directly in source code exposes them to anyone with read access to the repository, leading to potential quota exhaustion or abuse by unauthorized actors.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_WEB3FORMS_KEY`) with an empty string or secure placeholder fallback instead of hardcoded strings in source code.
## 2024-07-30 - Prevent Reverse Tabnabbing in window.open
**Vulnerability:** window.open calls with '_blank' missing 'noopener,noreferrer'
**Learning:** React automatically adds rel="noopener noreferrer" to target="_blank" links, but it doesn't protect programmatic window.open calls, leaving them vulnerable to reverse tabnabbing attacks where the opened page can access the window.opener object and navigate the original page to a malicious site.
**Prevention:** Always append 'noopener,noreferrer' as the third argument when using window.open(url, '_blank').
