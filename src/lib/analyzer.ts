import { getFileContent, getRepository } from "@/lib/github";
import { discoverRepository } from "@/lib/repository";

export async function analyzeRepository(owner: string, repo: string) {
  const repository = await getRepository(owner, repo);
  const discoveredFiles = await discoverRepository(owner, repo);

  const filesToAnalyze = discoveredFiles.filter(
    (file) => file.priority === "high" || file.priority === "medium"
  );

  const fileContents = [];

  for (const file of filesToAnalyze) {
    const content = await getFileContent(owner, repo, file.path);

    if (!content) {
      continue;
    }

    fileContents.push({
      path: file.path,
      content,
    });
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
    files: fileContents,
  };
}