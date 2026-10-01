# Contributing to RepoScribe

Thanks for contributing to RepoScribe.

RepoScribe turns GitHub repositories into evidence-based README documentation using repository analysis and Gemini AI. Contributions are welcome across code, tests, documentation, security, UX, and developer tooling.

## Before you start

1. Read the README.
2. Check existing issues before opening a new one.
3. For larger changes, comment on the issue first so work is not duplicated.
4. Never commit API keys, tokens, private keys, or real credentials.

## Local setup

### Prerequisites

- Node.js 20+
- npm
- A Gemini API key for running the generation flow

### Setup

```bash
git clone https://github.com/Abhinavjs903/RepoScribe.git
cd RepoScribe
npm install
```

Create `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Run the development server:

```bash
npm run dev
```

## Validation

Before opening a PR, run:

```bash
npm run lint
npm run build
```

If tests are available for the area you changed, run them too.

## Branches

Use descriptive branch names:

- `feat/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `test/<short-description>`
- `refactor/<short-description>`

Example:

```text
feat/repository-size-limits
```

## Pull requests

A good PR should:

- Solve one issue or one clearly defined problem.
- Explain what changed and why.
- Keep unrelated refactors out of scope.
- Include tests for behavior changes where practical.
- Update documentation when behavior/setup changes.
- Avoid exposing secrets or sensitive repository data.

## Commit messages

Prefer concise, descriptive commits:

```text
feat: add repository size limits
fix: handle GitHub rate limit responses
docs: improve contributor setup
test: cover GitHub URL parsing
```

## Issue reporting

When reporting a bug, include:

- What you expected
- What happened
- Steps to reproduce
- Relevant error output
- Environment details when useful

Do not include secrets in issues.

## Security

For suspected vulnerabilities or accidental secret exposure, do not publish sensitive details in a public issue. Follow the instructions in `SECURITY.md`.

## Scope

Please keep contributions aligned with RepoScribe's core goal: reliable, secure, evidence-based repository documentation.
