import {
  getFileContent,
  getRepository,
} from "@/lib/github";

import {
  discoverRepository,
} from "@/lib/repository";

import {
  detectTechnologies,
  detectFeatures,
  detectCommands,
  detectEnvironmentVariables,
  detectProjectType,
} from "@/lib/project-brain";

export async function analyzeRepository(
  owner: string,
  repo: string
) {
  const repository = await getRepository(
    owner,
    repo
  );

  const discoveredFiles =
    await discoverRepository(
      owner,
      repo
    );

  const filesToAnalyze =
    discoveredFiles.filter(
      (file) =>
        file.priority === "high" ||
        file.priority === "medium"
    );

 const results = await Promise.all(
  filesToAnalyze.map(async (file) => {
    const content = await getFileContent(
      owner,
      repo,
      file.path
    );

    if (!content) {
      return null;
    }

    return {
      path: file.path,
      content,
    };
  })
);

const fileContents = results.filter(
  (
    file
  ): file is {
    path: string;
    content: string;
  } => file !== null
);

  const technologies =
    detectTechnologies(fileContents);

  const features =
    detectFeatures(fileContents);

  const commands =
    detectCommands(fileContents);

  const environmentVariables =
    detectEnvironmentVariables(fileContents);

  const projectType =
    detectProjectType(fileContents);

  const structure =
    discoveredFiles.map((file) => ({
      path: file.path,
      purpose:
        file.priority === "high"
          ? "Important project or configuration file"
          : "Source or supporting file",
    }));

  return {
    project: {
      name: repository.name,
      description: repository.description,
      type: projectType,
    },

    technologies,

    features,

    commands,

    environmentVariables,

    structure,

    repository: {
      fullName: repository.full_name,
      language: repository.language,
      topics: repository.topics,
      stars: repository.stargazers_count,
      license:
        repository.license?.name ?? null,
      url: repository.html_url,
    },
  };
}