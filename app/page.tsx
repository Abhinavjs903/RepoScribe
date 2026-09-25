"use client";

import { useState } from "react";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateReadme() {
    setLoading(true);
    setError("");
    setReadme("");

    try {
      const response = await fetch("/api/generate-readme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setReadme(data.readme);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
            AI-powered documentation
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            README Generator
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Paste a public GitHub repository URL and generate a polished README in seconds.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={repoUrl}
              onChange={(event) => setRepoUrl(event.target.value)}
              placeholder="https://github.com/owner/repository"
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
            />

            <button
              onClick={generateReadme}
              disabled={loading}
              className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Generating..." : "Generate README"}
            </button>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-200">
              {error}
            </div>
          )}

          {readme && (
            <div className="mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-cyan-300">
                Generated README
              </h2>

              <textarea
                value={readme}
                readOnly
                className="h-[600px] w-full rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-sm text-slate-100 outline-none"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}