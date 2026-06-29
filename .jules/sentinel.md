## 2024-05-24 - AI Prompt Injection in Chat API
**Vulnerability:** The Vercel serverless function `api/chat.ts` accepted a `customPrompt` from the unauthenticated client request body and used it to override the AI's system instruction, leading to critical AI prompt injection.
**Learning:** System instructions define the security boundaries and core behavior of the AI agent. Allowing the client to control this circumvents all restrictions, allowing attackers to alter the AI's intended behavior or conduct social engineering.
**Prevention:** System instructions must be strictly controlled server-side and never overridden dynamically by unauthenticated client input.
