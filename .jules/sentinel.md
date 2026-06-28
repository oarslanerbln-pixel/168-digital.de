## 2024-05-24 - AI Prompt Injection via Unauthenticated Client Payload
**Vulnerability:** The Vercel serverless API (`api/chat.ts`) previously accepted a `customPrompt` field from the client's request body and used it directly as the `systemInstruction` for the Gemini AI model.
**Learning:** This allowed unauthenticated users to override the AI's intended behavior and system prompt, leading to prompt injection vulnerabilities. Client inputs must never dictate critical server-side configuration or security boundaries.
**Prevention:** Always control critical parameters like system prompts securely on the server-side. Ignore or sanitize client inputs that attempt to modify these instructions.
