## 2024-06-11 - AI Prompt Injection in Vercel Function
**Vulnerability:** The API route for chat (`api/chat.ts`) accepted a `customPrompt` from the client request body and used it directly as the system prompt for the Gemini AI.
**Learning:** This allowed unauthenticated users to completely override the AI's persona and instructions, bypassing safety measures. Vercel functions must strictly control system instructions on the server-side.
**Prevention:** Never trust client input to define AI system behavior or instructions. Always hardcode or use secure, backend environment variables for system prompts.
