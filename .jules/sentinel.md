## 2026-09-22 - [Add input length limits]
**Vulnerability:** User inputs lacked maximum length limitations, presenting potential vectors for minor denial of service or large payload submissions.
**Learning:** Common standard input forms often lack length limitation unless strictly enforced; React-based web apps may need client-side limitation to mitigate heavy backend process logic and UI payload issues.
**Prevention:** Consider creating common form components that inherit these limitations or include maximum length attributes as standard practice for any `<input>` and `<textarea>` components during development.
