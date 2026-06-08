## 2026-06-08 - [Hardcoded Cryptographic Hash in Frontend Client]
**Vulnerability:** A SHA-256 hash `MASTER_HASH = "59b696e669c2ea935466d49d5b8220fa48126af68563ef6ae117e60d13cd752e"` is hardcoded in the frontend code (`src/components/DevConsole.tsx`) and verified locally.
**Learning:** Hardcoding hashes or keys in the frontend for client-side authentication is insecure, as anyone can extract the expected hash or the source file `1618-dev-key.json` exists in the repository with the secret token.
**Prevention:** Never perform authentication exclusively on the frontend, and do not store sensitive keys, secrets, or expected hashes in client-side code.
