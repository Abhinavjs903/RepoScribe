import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function generateReadme(context: any) {
  const prompt = `
You are a senior software documentation engineer.

Generate a professional GitHub README.md using ONLY
the repository information provided below.

IMPORTANT RULES:
- Do not invent features.
- Do not invent technologies.
- Do not invent commands.
- Do not invent APIs.
- Do not invent deployment methods.
- Only use information supported by the repository data.
- If information is unavailable, omit it.

The README must include:

# Project Title

## Description

## Features

## Tech Stack

## Project Structure

## Installation

## Environment Variables

## Usage

## License

## Contributing

Repository information:

${JSON.stringify(context, null, 2)}

Return ONLY the Markdown README.
Do not wrap the entire response inside a markdown code block.


Also at last of Readme include Made with ❤️ and ☕ by Abhinav Dixit and Quant-Tech
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}