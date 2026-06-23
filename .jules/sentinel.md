## 2025-02-23 - [Prompt Injection Vulnerability in Serverless AI Function]
**Vulnerability:** The AI chat serverless function (`api/chat.ts`) accepted a `customPrompt` from the client request and used it as the AI's system instruction, overwriting the server's hardcoded security and persona instructions.
**Learning:** This existed because the codebase was likely testing different system prompts via the frontend but failed to secure the production endpoint. Exposing system prompt controls to unauthenticated clients leads to severe prompt injection and persona hijacking.
**Prevention:** Always hardcode or strictly control system instructions on the server-side. Never allow client input to override the system prompt in user-facing applications.
