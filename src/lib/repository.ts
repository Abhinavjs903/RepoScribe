import { getRepositoryContents } from "@/lib/github";

export type FilePriority = "high" | "medium" | "low";

export type RepositoryFile = {
  path: string;
  name: string;
  type: "file";
  size?: number;
  download_url?: string | null;
  priority: FilePriority;
};

const IGNORED_DIRECTORIES = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
  "out",
  ".turbo",
  ".cache",
  "venv",
  ".venv",
  "__pycache__",
]);

const IGNORED_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".ico",
  ".mp4",
  ".mov",
  ".avi",
  ".mp3",
  ".wav",
  ".zip",
  ".tar",
  ".gz",
  ".exe",
  ".dll",
  ".bin",
]);

const SECRET_FILES = new Set([
  ".env",
  ".env.local",
  ".env.production",
  ".env.development",
]);

const IMPORTANT_FILES = new Set([
  "package.json",
  "requirements.txt",
  "pyproject.toml",
  "go.mod",
  "Cargo.toml",
  "Dockerfile",
  "docker-compose.yml",
  "compose.yml",
  "README.md",
  "LICENSE",
  ".env.example",
  "tsconfig.json",
  "next.config.js",
  "next.config.mjs",
  "vite.config.ts",
]);

const HIGH_PRIORITY_DIRECTORIES = new Set([
  "routes",
  "controllers",
  "models",
  "services",
  "api",
  "config",
  "lib",
  "src",
]);

function getExtension(filename: string) {
  const lastDot = filename.lastIndexOf(".");

  if (lastDot === -1) {
    return "";
  }

  return filename.slice(lastDot).toLowerCase();
}

function shouldIgnoreDirectory(name: string) {
  return IGNORED_DIRECTORIES.has(name);
}

function shouldIgnoreFile(name: string) {
  const lowerName = name.toLowerCase();

  if (SECRET_FILES.has(lowerName)) {
    return true;
  }

  const extension = getExtension(lowerName);

  return IGNORED_EXTENSIONS.has(extension);
}

function getFilePriority(
  path: string,
  name: string
): FilePriority {
  if (IMPORTANT_FILES.has(name)) {
    return "high";
  }

  const pathParts = path.split("/");

  if (
    pathParts.some((part) =>
      HIGH_PRIORITY_DIRECTORIES.has(part)
    )
  ) {
    return "high";
  }

  const extension = getExtension(name);

  const sourceExtensions = new Set([
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py",
    ".java",
    ".c",
    ".cpp",
    ".h",
    ".hpp",
    ".go",
    ".rs",
    ".php",
    ".rb",
    ".cs",
    ".swift",
    ".kt",
  ]);

  if (sourceExtensions.has(extension)) {
    return "medium";
  }

  return "low";
}

export async function discoverRepository(
  owner: string,
  repo: string
) {
  const discoveredFiles: RepositoryFile[] = [];

  async function walk(path = ""): Promise<void> {
    const contents = await getRepositoryContents(
      owner,
      repo,
      path
    );

    for (const item of contents) {
      if (item.type === "dir") {
        if (shouldIgnoreDirectory(item.name)) {
          continue;
        }

        await walk(item.path);
        continue;
      }

      if (item.type !== "file") {
        continue;
      }

      if (shouldIgnoreFile(item.name)) {
        continue;
      }

      const priority = getFilePriority(
        item.path,
        item.name
      );

      discoveredFiles.push({
        path: item.path,
        name: item.name,
        type: "file",
        size: item.size,
        download_url: item.download_url,
        priority,
      });
    }
  }

  await walk();

  return discoveredFiles.sort((a, b) => {
    const priorityOrder = {
      high: 0,
      medium: 1,
      low: 2,
    };

    return (
      priorityOrder[a.priority] -
      priorityOrder[b.priority]
    );
  });
}