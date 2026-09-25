import {
  getRepository,
  getRepositoryContents,
  getFileContent,
} from "@/lib/github";

export async function analyzeRepository(
  owner: string,
  repo: string
) {
  const repository = await getRepository(owner, repo);

  const contents = await getRepositoryContents(owner, repo);

  const importantFiles = [
    "package.json",
    "requirements.txt",
    "pyproject.toml",
    "go.mod",
    "Cargo.toml",
    "Dockerfile",
    "docker-compose.yml",
    "LICENSE",
    ".env.example",
  ];

  const files: Record<string, string> = {};

  for (const file of importantFiles) {
    const exists = contents.some(
      (item: any) =>
        item.type === "file" && item.name === file
    );

    if (exists) {
      const content = await getFileContent(
        owner,
        repo,
        file
      );

      if (content) {
        files[file] = content;
      }
    }
  }

  return {
    repository: {
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      language: repository.language,
      topics: repository.topics,
      stars: repository.stargazers_count,
      license: repository.license?.name ?? null,
      url: repository.html_url,
    },
    files,
    structure: contents.map((item: any) => ({
      name: item.name,
      type: item.type,
    })),
  };
}