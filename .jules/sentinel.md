## 2024-05-31 - [Prompt Injection via API Body]
**Vulnerability:** The Gemini API handler allowed unauthenticated clients to inject system instructions (`customPrompt`) via the request body, overriding the intended AI behavior.
**Learning:** System instructions for LLMs must be strictly controlled server-side and never dynamically overridden by unauthenticated client input.
**Prevention:** Hardcode system prompts on the server or fetch them from a secure database/environment variable, ensuring client input only maps to user messages.
