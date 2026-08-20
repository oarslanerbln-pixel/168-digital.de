## 2024-07-24 - Hardcoded API Key in Lead Delivery Module
**Vulnerability:** A hardcoded Web3Forms API key (`'d10c80c0-53bb-42bc-8c88-13b634b41996'`) was found in `src/utils/leads.ts`.
**Learning:** Even for "client-side" or seemingly public API keys, embedding them directly in source code exposes them to anyone with read access to the repository, leading to potential quota exhaustion or abuse by unauthorized actors.
**Prevention:** Always use environment variables (e.g., `import.meta.env.VITE_WEB3FORMS_KEY`) with an empty string or secure placeholder fallback instead of hardcoded strings in source code.

## 2024-07-25 - Missing Input Validation on Contact Forms
**Vulnerability:** Contact forms (`Contact.tsx` and `AngebotModal.tsx`) were extracting email fields directly from `FormData` and passing them to `sendLead` without any validation.
**Learning:** Relying solely on HTML5 `type="email"` provides a false sense of security, as it can be easily bypassed. Lack of server-side (or pre-submission logic) validation can lead to malformed data delivery and potential abuse.
**Prevention:** Always implement logic-side validation (e.g., regex checking for emails) before transmitting user input to external services or APIs, ensuring failure is handled securely.
