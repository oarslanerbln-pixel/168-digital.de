## 2024-07-24 - Hardcoded API Key in Lead Delivery Module
**Vulnerability:** A hardcoded Web3Forms API key (`'d10c80c0-53bb-42bc-8c88-13b634b41996'`) was found in `src/utils/leads.ts`.
**Learning:** Even for "client-side" or seemingly public API keys, embedding them directly in source code exposes them to anyone with read access to the repository, leading to potential quota exhaustion or abuse by unauthorized actors.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_WEB3FORMS_KEY`) with an empty string or secure placeholder fallback instead of hardcoded strings in source code.

## 2024-11-20 - Prevent Programmatic Reverse Tabnabbing
**Vulnerability:** Found `window.open(url, '_blank')` calls without explicitly setting `noopener,noreferrer`. React does not automatically add these protections to programmatic `window.open` calls like it does for declarative `<a target="_blank">` tags. This creates a reverse tabnabbing vulnerability where the newly opened page can manipulate the `window.opener` object of the original page.
**Learning:** Developers often assume React's built-in protections for `<a>` tags extend to programmatic navigation, but they do not. The `window.opener` object remains accessible unless explicitly blocked.
**Prevention:** Always append `'noopener,noreferrer'` as the third argument when calling `window.open(url, '_blank')` in JavaScript/TypeScript code.
