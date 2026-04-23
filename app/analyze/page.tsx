"use client";

import { useEffect, useState } from "react";

export default function AnalyzePage() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");

  useEffect(() => {
    if (!username) return;

    fetch(`/api/github?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      });
  }, [username]);

  return (
    <main className="p-6">
      <h1>Repos for {username}</h1>

      {loading && <p>Loading...</p>}

      <div className="grid gap-4 mt-6">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="p-4 border border-gray-800 rounded-lg bg-gray-900 hover:bg-gray-800 transition"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{repo.name}</h2>
              <span className="text-sm text-gray-400">⭐ {repo.stars}</span>
            </div>

            <p className="text-gray-400 text-sm mt-2">
              {repo.description || "No description provided"}
            </p>

            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-gray-500">
                {repo.language || "Unknown"}
              </span>

              <a
                href={repo.url}
                target="_blank"
                className="text-blue-400 text-xs hover:underline"
              >
                View →
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
