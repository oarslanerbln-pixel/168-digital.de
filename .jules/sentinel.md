## 2024-06-22 - System Prompt Override Risk
**Vulnerability:** System prompt could be dynamically overridden via client-provided `customPrompt` in `/api/chat.ts`.
**Learning:** This exposes the application to prompt injection attacks, allowing attackers to change the AI's behavior and potentially extract sensitive backend information.
**Prevention:** Strictly control system instructions server-side and never allow unauthenticated client input to override them dynamically.
