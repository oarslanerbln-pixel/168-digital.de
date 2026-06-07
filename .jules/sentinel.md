## 2026-06-07 - [Prompt Injection and Hardcoded Secret]
**Vulnerability:** A hardcoded token was committed to `1618-dev-key.json` and a prompt injection / authorization bypass in `api/chat.ts` existed allowing users to override the custom prompt without providing authorization.
**Learning:** Hardcoded dev keys in json files bypass security completely. Leaving the dev console's auth state purely client side for testing can leave server endpoints vulnerable to unauthorized modifications.
**Prevention:** Add `*key.json` to `.gitignore`. Implement a server-side hash verification for endpoints that permit admin/developer functionalities such as custom prompts.
