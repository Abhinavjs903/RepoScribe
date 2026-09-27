# RepoScribe

> Turn your codebase into clear, professional documentation.

RepoScribe is an AI-powered GitHub documentation tool that analyzes repositories and uses Gemini AI to generate professional, structured README files.

The project is designed to support both public and private GitHub repositories while keeping repository credentials and sensitive information secure.


🚀 Getting Started
Prerequisites

Make sure you have the following installed:

Node.js
npm
A Google Gemini API key
Installation

Clone the repository:

git clone (https://github.com/Abhinavjs903/RepoScribe)
cd RepoScribe

Install dependencies:

npm install
Environment Variables

Create a .env.local file in the project root:

GEMINI_API_KEY=your_gemini_api_key

Never commit .env.local or expose your API key in client-side code.

Run the Development Server
npm run dev

Open:

http://localhost:3000

Enter a public GitHub repository URL and generate its README.

🔄 How It Works
GitHub Repository URL
        ↓
GitHub API
        ↓
Repository Metadata & Files
        ↓
Repository Analyzer
        ↓
Gemini AI
        ↓
Generated README

RepoScribe currently focuses on public repositories. Private repository support will be added through secure GitHub authentication.

🔐 Security

RepoScribe is designed to keep API credentials outside the client-side application.

API keys are stored using environment variables.
Sensitive credentials should never be committed to Git.
GitHub authentication for private repositories will use secure OAuth-based access.
Repository data sent to the AI layer will be controlled by the application.
🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Before contributing, please check the project's contribution guidelines when available.



## ✨ Current Features

- 🔗 Generate README files from public GitHub repository URLs
- 🔍 Fetch repository metadata using the GitHub API
- 📁 Analyze repository structure and important project files
- 🤖 Generate documentation using Google Gemini AI
- 📝 Generate structured Markdown README files
- ⚠️ Handle invalid GitHub URLs and repository/API errors
- 🔐 Environment-based API key configuration

## 🚧 Project Status

RepoScribe is currently under active development.

### Implemented

- Public GitHub repository URL parsing
- GitHub repository metadata fetching
- Repository file/content fetching
- Basic repository analysis
- Gemini-powered README generation
- README preview in the web interface

### Planned

- Recursive repository/code analysis
- Improved project architecture detection
- README quality validation
- Secret and sensitive-data detection
- GitHub OAuth authentication
- Private repository support
- README regeneration and refinement
- GitHub branch/commit/PR integration

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API
- **Repository API:** GitHub REST API
- **Runtime:** Node.js

## 📁 Project Structure

```text
RepoScribe/
├── app/
│   ├── api/
│   │   └── generate-readme/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
│
├── src/
│   └── lib/
│       ├── analyzer.ts
│       ├── gemini.ts
│       └── github.ts
│
├── .env.local
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```


## 📄 License

License information will be added as the project develops.

Abhinav Dixit, Signing off...
