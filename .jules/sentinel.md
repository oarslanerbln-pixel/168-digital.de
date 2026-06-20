## 2024-05-24 - [Fix] Server-Side Hardcoded AI Instructions
**Vulnerability:** System instructions in Vercel Serverless Function `api/chat.ts` could be overridden dynamically by unauthenticated client input through the `customPrompt` parameter in the payload sent by `src/components/AIChatDrawer.tsx`.
**Learning:** Client-provided custom instructions for AI agents introduce a Prompt Injection vulnerability, allowing attackers to change the instructions to exfiltrate data, bypass the intended AI persona, or generate malicious responses.
**Prevention:** Always control AI system instructions strictly on the server-side. Never pass unvalidated system prompts from client applications.
