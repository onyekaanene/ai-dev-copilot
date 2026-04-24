"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Repo = {
  id: number;
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
};

export default function AnalyzePage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const username = searchParams.get("username");


  useEffect(() => {
    if (!username) return;

      const fetchData = async () => {
        const res = await fetch(`/api/github?username=${username}`);
        const data = await res.json();
        setRepos(data);

        const aiRes = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ repos: data }),
        });

        const aiData = await aiRes.json();
        setAnalysis(aiData.result);

        setLoading(false);
      };

      fetchData();
  }, [username]);
  
  return (
    <main className="min-h-screen px-4 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Analysis for <span className="text-blue-400">{username}</span>
        </h1>
        <p className="text-gray-400 text-xs">
          Developed by: Onyekachukwu Anene
        </p>
        <p className="text-gray-400 text-sm">
          ----------------------------------
        </p>
        <p className="text-white-400 text-sm">AI-powered GitHub portfolio feedback</p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-gray-400 animate-pulse">
          Analyzing repositories...
        </div>
      )}

      {!loading && (
        <>
          {/* AI Card */}
          <div className="mb-8 p-6 bg-gray-900/70 backdrop-blur border border-gray-800 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-3">AI Feedback</h2>

            <p className="text-gray-300 whitespace-pre-line leading-relaxed">
              {analysis || "No feedback yet."}
            </p>
          </div>

          {/* Repo Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="p-5 bg-gray-900/70 backdrop-blur border border-gray-800 rounded-xl hover:border-gray-700 hover:scale-[1.01] transition"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg">{repo.name}</h2>
                  <span className="text-sm text-gray-400">⭐ {repo.stars}</span>
                </div>

                <p className="text-gray-400 text-sm mt-2">
                  {repo.description || "No description"}
                </p>

                <div className="flex justify-between items-center mt-4">
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
        </>
      )}
    </main>
  );
}
