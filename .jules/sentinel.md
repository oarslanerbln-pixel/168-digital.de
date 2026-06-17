## 2026-06-17 - Prevent AI Prompt Injection in Serverless Functions
**Vulnerability:** The serverless function `api/chat.ts` accepted a `customPrompt` from the client's `req.body` and used it as the `systemInstruction` for the Google Gemini API, overriding the server-side system prompt.
**Learning:** This exposes the application to AI prompt injection, where an unauthenticated client could arbitrarily change the agent's behavior, tone, or restrictions, completely overriding server-side instructions meant to govern the AI's boundaries.
**Prevention:** System instructions must be strictly controlled server-side and never dynamically overridden by unauthenticated client input.
