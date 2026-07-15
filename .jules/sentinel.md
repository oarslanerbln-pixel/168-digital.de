## 2024-07-15 - Vercel Serverless Function AI Prompt Injection
**Vulnerability:** Unauthenticated clients could override the AI's system prompt by providing a `customPrompt` in the request body to `/api/chat`, causing a severe prompt injection vulnerability.
**Learning:** System instructions for LLMs must be strictly controlled server-side. Trusting client input to dictate the AI's core behavior allows attackers to hijack the model for unintended purposes (e.g., spam, malicious output, data extraction).
**Prevention:** Never accept system prompts or critical behavior-defining instructions from the client side in an unauthenticated or public-facing endpoint. Always hardcode or securely fetch these server-side.
