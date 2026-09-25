import { NextRequest, NextResponse } from "next/server";
import { parseGithubUrl } from "@/lib/github";
import { analyzeRepository } from "@/lib/analyzer";
import { generateReadme } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const repoUrl = body.repoUrl;

    if (!repoUrl || typeof repoUrl !== "string") {
      return NextResponse.json(
        { error: "GitHub repository URL is required" },
        { status: 400 }
      );
    }

    const parsed = parseGithubUrl(repoUrl);

    if (!parsed) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid GitHub repository URL",
        },
        { status: 400 }
      );
    }

    const context = await analyzeRepository(
      parsed.owner,
      parsed.repo
    );

    const readme = await generateReadme(context);

    return NextResponse.json({
      success: true,
      readme,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      { status: 500 }
    );
  }
}