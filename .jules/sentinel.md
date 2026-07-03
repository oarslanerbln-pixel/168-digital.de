## 2024-06-25 - Prevent AI Prompt Injection from Client Input

**Vulnerability:** The Vercel serverless function `api/chat.ts` accepted a `customPrompt` parameter from the client which could override the system instruction sent to the Gemini API. This allowed unauthenticated users to perform AI prompt injection attacks by modifying the model's behavior.
**Learning:** Client-side inputs should never directly override system-level instructions or constraints for AI models, especially in unauthenticated endpoints. Trusting the client to not provide malicious system prompts is dangerous.
**Prevention:** Hardcode system prompts server-side or load them from secure server configuration. Never accept system prompt overrides from client requests.
