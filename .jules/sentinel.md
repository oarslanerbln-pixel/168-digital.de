## 2024-05-18 - Fix prompt injection vulnerability in Vercel Serverless Function
**Vulnerability:** Unauthenticated client requests were able to dynamically override the backend LLM's system prompt by supplying a custom prompt parameter in the request payload.
**Learning:** System instructions and rules for AI agents must be strictly controlled server-side. Allowing client input to override them via `customPrompt` or similar fields enables Prompt Injection, which can compromise the AI's behavior, leak data, or bypass intended restrictions.
**Prevention:** Never trust client input to define critical system behaviors. Remove all mechanisms that allow user payloads to directly specify or override backend system prompts.
