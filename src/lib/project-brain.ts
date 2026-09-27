export type Evidence = {
  file: string;
  reason: string;
};

export type BrainFeature = {
  name: string;
  confidence: "high" | "medium";
  evidence: Evidence[];
};

export type BrainTechnology = {
  name: string;
  category:
    | "language"
    | "runtime"
    | "framework"
    | "database"
    | "library"
    | "tool";
  evidence: Evidence[];
};

export type ProjectBrain = {
  project: {
    name: string;
    description: string | null;
    type: string;
  };

  technologies: BrainTechnology[];

  features: BrainFeature[];

  structure: {
    path: string;
    purpose: string;
  }[];

  commands: {
    name: string;
    command: string;
    evidence: Evidence[];
  }[];

  environmentVariables: string[];
};

export function detectTechnologies(
  files: { path: string; content: string }[]
) {
  const technologies: BrainTechnology[] = [];

  for (const file of files) {
    const content = file.content.toLowerCase();

    if (content.includes('"express"') || content.includes("express(")) {
      technologies.push({
        name: "Express.js",
        category: "framework",
        evidence: [
          {
            file: file.path,
            reason: "Express dependency or usage detected",
          },
        ],
      });
    }

    if (content.includes("mongoose") || content.includes("mongoose.model")) {
      technologies.push({
        name: "Mongoose",
        category: "library",
        evidence: [
          {
            file: file.path,
            reason: "Mongoose usage detected",
          },
        ],
      });
    }

    if (
      content.includes("jsonwebtoken") ||
      content.includes("jwt.sign") ||
      content.includes("jwt.verify")
    ) {
      technologies.push({
        name: "JSON Web Token",
        category: "library",
        evidence: [
          {
            file: file.path,
            reason: "JWT implementation detected",
          },
        ],
      });
    }

    if (content.includes("bcrypt") || content.includes("bcryptjs")) {
      technologies.push({
        name: "bcrypt",
        category: "library",
        evidence: [
          {
            file: file.path,
            reason: "Password hashing library detected",
          },
        ],
      });
    }
  }

  return technologies;
}