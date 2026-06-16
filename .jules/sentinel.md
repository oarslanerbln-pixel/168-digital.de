## 2024-06-16 - AI Prompt Injection via customPrompt
**Vulnerability:** The serverless function `api/chat.ts` allowed the client to dynamically override the AI's `systemPrompt` via a `customPrompt` field in the request body. This could be exploited by malicious actors to inject arbitrary instructions and bypass the intended constraints of the AI model.
**Learning:** This vulnerability existed because the server trusted unauthenticated client input for a critical AI configuration (the system instruction). This was likely a leftover feature for development testing that made it into production.
**Prevention:** System instructions for AI models must be strictly controlled server-side and never be dynamically overridden by unauthenticated client input.
