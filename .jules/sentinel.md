## 2024-05-27 - [Client-Side Prompt Injection in Chat API]
**Vulnerability:** The Vercel serverless function (`api/chat.ts`) was extracting `customPrompt` from the client request and passing it as the `systemInstruction` to the Gemini API, effectively allowing any user to override the AI's core behavior and system prompt.
**Learning:** System instructions and critical boundaries must ALWAYS be enforced on the server-side. Relying on the client to send the "correct" prompt is fundamentally insecure, even if it's just meant as a developer tool override (as seen in `DevConsole.tsx`).
**Prevention:** Never allow unauthenticated client input to define or override core system instructions or model behavior parameters in server-side API endpoints.
