## 2024-11-21 - Prompt Injection Vulnerability in AI Chat

**Vulnerability:** The AI chat feature allowed clients to pass a `customPrompt` in the request body that directly overrode the server's system instructions to the LLM.
**Learning:** This existed because of an unused/legacy developer override in `localStorage` (`1618_ai_system_prompt`) that was mapped to the `customPrompt` payload in `src/components/AIChatDrawer.tsx` and directly passed to the Gemini API via Vercel serverless function `api/chat.ts`.
**Prevention:** System prompts should always be controlled server-side. Never trust the client with critical system instructions or parameters that govern LLM behavior, to prevent injection attacks and potential abuse of API keys.
