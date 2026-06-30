## 2024-05-18 - [Prompt Injection via Client Override]
**Vulnerability:** The Vercel serverless function (`api/chat.ts`) allowed unauthenticated clients to override the AI system prompt via the `customPrompt` payload parameter.
**Learning:** Hardcoding a default `systemPrompt` in the backend is insufficient if the API accepts and prioritizes a client-provided override, turning the endpoint into an open LLM proxy.
**Prevention:** System instructions must be strictly controlled server-side and never be dynamically overridden or appended by unauthenticated client input.
