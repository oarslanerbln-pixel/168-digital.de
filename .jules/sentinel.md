## 2024-07-24 - Hardcoded API Key in Lead Delivery Module
**Vulnerability:** A hardcoded Web3Forms API key (`'d10c80c0-53bb-42bc-8c88-13b634b41996'`) was found in `src/utils/leads.ts`.
**Learning:** Even for "client-side" or seemingly public API keys, embedding them directly in source code exposes them to anyone with read access to the repository, leading to potential quota exhaustion or abuse by unauthorized actors.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_WEB3FORMS_KEY`) with an empty string or secure placeholder fallback instead of hardcoded strings in source code.

## 2024-08-07 - Reverse Tabnabbing Vulnerability via programmatic window.open
**Vulnerability:** A reverse tabnabbing vulnerability was found where `window.open` was called programmatically for an external target URL without explicitly passing `noopener` or `noreferrer` flags in React components (`src/components/Hero.tsx` and `src/components/WhatsAppWidget.tsx`).
**Learning:** React implicitly provides protection for declarative `<a target="_blank">` elements by appending `rel="noopener noreferrer"`. However, when navigating dynamically via programmatic `window.open(url, '_blank')`, it lacks this automatic safeguard. Without `noopener,noreferrer`, the newly opened external page could potentially exploit `window.opener` to execute malicious code on or manipulate the originating tab.
**Prevention:** Always append `'noopener,noreferrer'` as the third argument when using programmatic `window.open` calls for untrusted external URLs (e.g., `window.open(url, '_blank', 'noopener,noreferrer');`).
