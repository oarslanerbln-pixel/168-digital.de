## 2026-06-15 - [Prompt Injection Vulnerability in Vercel Serverless Functions]
**Vulnerability:** The `api/chat.ts` endpoint was dynamically overriding its core system instructions using a `customPrompt` value provided by the unauthenticated frontend request. This allowed potential prompt injection, completely subverting the AI's intended behavior.
**Learning:** System instructions and application constraints should never trust client-side overrides. The vulnerability existed because the developer allowed local storage values to control the AI's core behavior on the server.
**Prevention:** System prompts must always be strictly defined and enforced on the server. Client-provided arguments should only be treated as raw text for the user message, never as system-level directives.
