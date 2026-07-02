## 2024-07-02 - AI Prompt Injection in Chat API
**Vulnerability:** The Vercel serverless function `api/chat.ts` allowed the client to pass a `customPrompt` in the request body, which overrode the server-side `systemPrompt`. This enabled unauthenticated users to perform AI prompt injection and control the AI's behavior.
**Learning:** Client-provided parameters should never be blindly trusted to dictate system instructions, especially in AI agent implementations, as it bypasses all safety rails.
**Prevention:** System instructions must be strictly controlled server-side and never overridden dynamically by unauthenticated client input.
