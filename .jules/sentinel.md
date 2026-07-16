## 2026-07-16 - [Fix AI Prompt Injection vulnerability in chat API]
**Vulnerability:** Unauthenticated clients could provide a customPrompt parameter to the /api/chat endpoint which was directly used to override the AI agent's systemInstruction.
**Learning:** System instructions and rules for AI generation must always be controlled server-side. Exposing these to user inputs allows prompt injection attacks where users can bypass security or behavior constraints.
**Prevention:** Never map client-controlled input directly to the systemPrompt or systemInstruction fields in an AI model request without strict server-side validation or complete isolation. In this case, simply remove the use of the client `customPrompt` field.
