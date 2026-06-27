
## 2024-06-27 - [Serverless Prompt Injection via Client Payload]
**Vulnerability:** The Vercel serverless function `api/chat.ts` accepted a `customPrompt` from the client (`req.body`) and used it directly as the AI's system instruction, completely overriding the server-defined `systemPrompt`.
**Learning:** This existed because the feature likely started as a debugging tool reading from local storage (`localStorage.getItem('1618_ai_system_prompt')`) but was left in production, allowing any user to hijack the AI's core behavior by crafting a malicious API request.
**Prevention:** System instructions must always be strictly defined server-side. Never trust the client to define or override core security boundaries, system prompts, or authentication parameters. If testing tools are needed, they must require strong authentication or be entirely removed in production builds.
