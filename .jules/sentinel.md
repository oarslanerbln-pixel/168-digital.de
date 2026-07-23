## 2026-07-23 - Prevent AI Prompt Injection from Client
**Vulnerability:** The Vercel serverless function `api/chat.ts` accepted a `customPrompt` from the client request body and used it directly as the system prompt for the Gemini AI. This allowed unauthenticated users to override the AI's behavior via a simple API call or localStorage manipulation.
**Learning:** System instructions and configuration must be strictly controlled server-side. Allowing client input to override AI system prompts leads to prompt injection vulnerabilities.
**Prevention:** Hardcode system prompts or load them from secure server-side configuration, ignoring any such attempts passed from the client payload.
