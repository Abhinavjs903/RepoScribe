export function parseGithubUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname !== "github.com") {
      return null;
    }

    const parts = parsed.pathname.split("/").filter(Boolean);

    if (parts.length < 2) {
      return null;
    }

    return {
      owner: parts[0],
      repo: parts[1],
    };
  } catch {
    return null;
  }
}

export async function getRepository(owner: string, repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Repository not found");
    }

    if (response.status === 403) {
      throw new Error("GitHub API rate limit exceeded");
    }

    throw new Error("Failed to fetch repository");
  }

  return response.json();
}
export async function getRepositoryContents(
  owner: string,
  repo: string,
  path = ""
) {
  const url = path
    ? `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
    : `https://api.github.com/repos/${owner}/${repo}/contents`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Path not found: ${path || "/"}`);
    }

    if (response.status === 403) {
      throw new Error("GitHub API rate limit exceeded");
    }

    throw new Error("Failed to fetch repository contents");
  }

  return response.json();
}
export async function getFileContent(
  owner: string,
  repo: string,
  path: string
) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Accept: "application/vnd.github.raw+json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.text();
}