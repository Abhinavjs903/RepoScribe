import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function generateReadme(
  projectBrain: unknown
) {
  const prompt = `
You are a senior software documentation engineer.

Generate a professional GitHub README.md using ONLY
the evidence-backed project information provided below.

IMPORTANT RULES:

- Do not invent features.
- Do not invent technologies.
- Do not invent commands.
- Do not invent APIs.
- Do not invent deployment methods.
- Do not invent environment variables.
- Do not assume functionality from filenames alone.
- Only make claims supported by the provided evidence.
- If information is unavailable, omit it.
- Do not expose secrets or credentials.
- Keep the README concise and useful.
- Do not add unnecessary sections.
- Do not claim a license unless license evidence exists.

The README should adapt its structure to the project.

Use the project type and available evidence to decide
which sections are useful.

Possible sections include:

# Project Title

## Description

## Features

## Tech Stack

## Project Structure

## Installation

## Environment Variables

## Usage

## API

## Contributing

## License

Only include sections that are supported by the
project information.

PROJECT BRAIN:

${JSON.stringify(projectBrain, null, 2)}

Return ONLY the Markdown README.
Do not wrap the response inside a markdown code block.

At the end include:

Made with ❤️ and ☕ by Abhinav Dixit and Quant-Tech
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
}