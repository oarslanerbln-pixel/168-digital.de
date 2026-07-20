## 2026-07-20 - Prevent AI Prompt Injection
**Vulnerability:** The Vercel serverless function (`api/chat.ts`) accepted an unauthenticated `customPrompt` from the client request body and used it to override the AI model's system instructions.
**Learning:** System instructions define the core behavior and safety boundaries of an AI model. Exposing this configuration to client-side input allows attackers to bypass intended constraints and repurpose the AI for unintended tasks (Prompt Injection).
**Prevention:** System prompts must always be strictly defined and enforced server-side. Never allow client-provided parameters to dynamically override core AI system instructions or behavior configurations.
