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

export type BrainCommand = {
  name: string;
  command: string;
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

  commands: BrainCommand[];

  environmentVariables: string[];
};

function addEvidence(
  list: Evidence[],
  evidence: Evidence
) {
  const exists = list.some(
    (item) =>
      item.file === evidence.file &&
      item.reason === evidence.reason
  );

  if (!exists) {
    list.push(evidence);
  }
}

export function detectTechnologies(
  files: { path: string; content: string }[]
): BrainTechnology[] {
  const technologies: BrainTechnology[] = [];

  for (const file of files) {
    const content = file.content.toLowerCase();

    if (
      content.includes('"express"') ||
      content.includes("express(")
    ) {
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

    if (
      content.includes("mongoose") ||
      content.includes("mongoose.model")
    ) {
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
      content.includes("mongodb") ||
      content.includes("mongodb+srv")
    ) {
      technologies.push({
        name: "MongoDB",
        category: "database",
        evidence: [
          {
            file: file.path,
            reason: "MongoDB connection or usage detected",
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

    if (
      content.includes("bcrypt") ||
      content.includes("bcryptjs")
    ) {
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

    if (
      content.includes("nodemailer")
    ) {
      technologies.push({
        name: "Nodemailer",
        category: "library",
        evidence: [
          {
            file: file.path,
            reason: "Nodemailer usage detected",
          },
        ],
      });
    }

    if (
      content.includes("next") &&
      (
        content.includes('"next"') ||
        content.includes("next/")
      )
    ) {
      technologies.push({
        name: "Next.js",
        category: "framework",
        evidence: [
          {
            file: file.path,
            reason: "Next.js dependency or usage detected",
          },
        ],
      });
    }

    if (
      content.includes("react") &&
      (
        content.includes('"react"') ||
        content.includes("react/")
      )
    ) {
      technologies.push({
        name: "React",
        category: "library",
        evidence: [
          {
            file: file.path,
            reason: "React dependency or usage detected",
          },
        ],
      });
    }
  }

  return deduplicateTechnologies(technologies);
}

export function deduplicateTechnologies(
  technologies: BrainTechnology[]
): BrainTechnology[] {
  const map = new Map<string, BrainTechnology>();

  for (const technology of technologies) {
    const existing = map.get(technology.name);

    if (!existing) {
      map.set(technology.name, {
        ...technology,
        evidence: [...technology.evidence],
      });

      continue;
    }

    for (const evidence of technology.evidence) {
      addEvidence(existing.evidence, evidence);
    }
  }

  return Array.from(map.values());
}

export function detectFeatures(
  files: { path: string; content: string }[]
): BrainFeature[] {
  const features: BrainFeature[] = [];

  for (const file of files) {
    const content = file.content.toLowerCase();

    if (
      content.includes("jwt.sign") ||
      content.includes("jwt.verify")
    ) {
      features.push({
        name: "JWT Authentication",
        confidence: "high",
        evidence: [
          {
            file: file.path,
            reason:
              "jwt.sign or jwt.verify implementation detected",
          },
        ],
      });
    }

    if (
      content.includes("bcrypt.hash") ||
      content.includes("bcrypt.compare")
    ) {
      features.push({
        name: "Password Hashing",
        confidence: "high",
        evidence: [
          {
            file: file.path,
            reason:
              "bcrypt password hashing/comparison detected",
          },
        ],
      });
    }

    if (
      content.includes("otp-generator") ||
      content.includes("generateotp") ||
      content.includes("generateotp(")
    ) {
      features.push({
        name: "OTP Generation",
        confidence: "high",
        evidence: [
          {
            file: file.path,
            reason:
              "OTP generation implementation detected",
          },
        ],
      });
    }

    if (
      content.includes("forgot-password") ||
      content.includes("forgotpassword") ||
      content.includes("reset-password") ||
      content.includes("resetpassword")
    ) {
      features.push({
        name: "Password Reset",
        confidence: "high",
        evidence: [
          {
            file: file.path,
            reason:
              "Password reset flow detected",
          },
        ],
      });
    }

    if (
      content.includes("sendmail") ||
      content.includes("nodemailer") ||
      content.includes("transporter.sendmail")
    ) {
      features.push({
        name: "Email Sending",
        confidence: "high",
        evidence: [
          {
            file: file.path,
            reason:
              "Email sending implementation detected",
          },
        ],
      });
    }
  }

  return deduplicateFeatures(features);
}

function deduplicateFeatures(
  features: BrainFeature[]
): BrainFeature[] {
  const map = new Map<string, BrainFeature>();

  for (const feature of features) {
    const existing = map.get(feature.name);

    if (!existing) {
      map.set(feature.name, {
        ...feature,
        evidence: [...feature.evidence],
      });

      continue;
    }

    for (const evidence of feature.evidence) {
      addEvidence(existing.evidence, evidence);
    }
  }

  return Array.from(map.values());
}

export function detectCommands(
  files: { path: string; content: string }[]
): BrainCommand[] {
  const commands: BrainCommand[] = [];

  for (const file of files) {
    if (!file.path.endsWith("package.json")) {
      continue;
    }

    try {
      const packageJson = JSON.parse(file.content);

      const scripts = packageJson.scripts;

      if (!scripts) {
        continue;
      }

      for (const [name, command] of Object.entries(
        scripts
      )) {
        commands.push({
          name,
          command: String(command),
          evidence: [
            {
              file: file.path,
              reason: `npm script "${name}" detected`,
            },
          ],
        });
      }
    } catch {
      // Ignore invalid package.json files.
    }
  }

  return commands;
}

export function detectEnvironmentVariables(
  files: { path: string; content: string }[]
): string[] {
  const variables = new Set<string>();

  for (const file of files) {
    if (
      file.path.endsWith(".env.example") ||
      file.path.endsWith(".env.sample")
    ) {
      const lines = file.content.split("\n");

      for (const line of lines) {
        const trimmed = line.trim();

        if (
          !trimmed ||
          trimmed.startsWith("#")
        ) {
          continue;
        }

        const match = trimmed.match(
          /^([A-Z][A-Z0-9_]*)\s*=/
        );

        if (match) {
          variables.add(match[1]);
        }
      }
    }
  }

  return Array.from(variables);
}

export function detectProjectType(
  files: { path: string; content: string }[]
): string {
  const allContent = files
    .map((file) => file.content.toLowerCase())
    .join("\n");

  const paths = files.map((file) => file.path);

  if (
    allContent.includes("express(") &&
    (
      allContent.includes("router.") ||
      paths.some((path) =>
        path.includes("routes/")
      )
    )
  ) {
    return "backend-api";
  }

  if (
    allContent.includes("next") ||
    paths.some((path) =>
      path.startsWith("app/")
    )
  ) {
    return "nextjs-web-app";
  }

  if (
    allContent.includes("react") ||
    paths.some((path) =>
      path.includes("components/")
    )
  ) {
    return "web-application";
  }

  if (
    files.some((file) =>
      file.path.endsWith("package.json")
    )
  ) {
    return "nodejs-project";
  }

  return "unknown";
}