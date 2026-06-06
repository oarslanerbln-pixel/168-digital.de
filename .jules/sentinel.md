## 2026-06-06 - [Leaked Master Key JSON]
**Vulnerability:** A custom drag-and-drop key file (`1618-dev-key.json`) containing a master key token used to bypass authentication in the developer console was committed to the repository by accident.
**Learning:** Hardcoded configuration files, even if intended only for developer local setups, can easily be committed if not ignored by `.gitignore`.
**Prevention:** Always add any sensitive environment config files, or secret keys files (like `*-key.json`) to `.gitignore` when introducing them as features or during setup to ensure they are never tracked.
