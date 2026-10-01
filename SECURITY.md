# Security Policy

## Supported versions

RepoScribe is currently under active development. Security fixes should target the latest version on `main`.

## Reporting a vulnerability

Please do not disclose exploitable vulnerability details or credentials in a public GitHub issue.

For a private report, contact the repository maintainer through the contact method listed on the maintainer's GitHub profile.

When reporting a vulnerability, include:

- A short description
- Steps to reproduce
- Potential impact
- A minimal proof of concept where safe
- Suggested remediation, if known

## Secrets

Never commit:

- Gemini API keys
- GitHub tokens
- Private keys
- Database credentials
- Real `.env` files
- Credentials copied from analyzed repositories

If a secret is accidentally committed, rotate/revoke it immediately and then remove it from the repository history where appropriate.

## AI data handling

RepoScribe sends analyzed project context to the configured Gemini model to generate documentation. Contributors working on repository analysis or prompt construction must ensure sensitive data is filtered before it reaches the AI layer.
