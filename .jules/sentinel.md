## 2024-07-01 - Prevent AI Prompt Injection in Serverless Functions
**Vulnerability:** The AI chat endpoint (`api/chat.ts`) accepted a `customPrompt` parameter directly from the client request (which was populated from `localStorage`), allowing any user to override the AI's system instructions and change its behavior.
**Learning:** System instructions for LLMs must be strictly controlled server-side. Accepting prompt overrides from unauthenticated client input creates a prompt injection vulnerability.
**Prevention:** Hardcode or retrieve system prompts securely on the server-side, completely ignoring any system-level prompt directives passed from the frontend.
