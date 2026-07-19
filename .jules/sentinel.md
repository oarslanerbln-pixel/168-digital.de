## 2024-05-15 - [AI Prompt Injection]
**Vulnerability:** Client-side 'customPrompt' bypassing hardcoded backend system instructions in api/chat.ts
**Learning:** Destructuring and prioritizing optional client parameters over server constants for LLM configurations leads to full prompt override and potential API abuse.
**Prevention:** Strictly define and enforce LLM generation constraints (like System Prompts) entirely server-side. Do not expose them to client manipulation.
