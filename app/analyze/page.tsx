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

      {repos.map((repo) => (
        <div key={repo.id}>
          <p>{repo.name}</p>
        </div>
      ))}
    </main>
  );
}
