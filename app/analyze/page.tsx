type Repo = {
  id: number;
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
};

async function getRepos(username: string): Promise<Repo[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/github?username=${username}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
}

async function getAnalysis(repos: Repo[]) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ repos }),
    cache: "no-store",
  });

  const data = await res.json();
  return data.result;
}

export default async function AnalyzePage({
  searchParams,
}: {
  searchParams: Promise<{ username?: string }>;
}) {
  const params = await searchParams;
  const username = params.username;

  if (!username) {
    return (
      <main className="p-10 text-white">
        <p>No username provided.</p>
      </main>
    );
  }

  const repos = await getRepos(username);
  const analysis = await getAnalysis(repos);

  return (
    <main className="min-h-screen px-4 py-10 max-w-5xl mx-auto text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Analysis for <span className="text-blue-400">{username}</span>
        </h1>

        <p className="text-gray-400 text-xs">Developed by Onyekachukwu Anene</p>

        <p className="text-gray-400 text-sm mt-1">
          AI-powered GitHub portfolio feedback
        </p>
      </div>

      {/* AI Feedback */}
      <div className="mb-8 p-6 bg-gray-900/70 border border-gray-800 rounded-2xl">
        <h2 className="text-xl font-semibold mb-3">AI Feedback</h2>

        <p className="text-gray-300 whitespace-pre-line">
          {analysis || "No feedback available"}
        </p>
      </div>

      {/* Repo Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="p-5 bg-gray-900/70 border border-gray-800 rounded-xl"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold text-lg">{repo.name}</h2>
              <span className="text-sm text-gray-400">⭐ {repo.stars}</span>
            </div>

            <p className="text-gray-400 text-sm mt-2">
              {repo.description || "No description"}
            </p>

            <div className="flex justify-between mt-4">
              <span className="text-xs text-gray-500">
                {repo.language || "Unknown"}
              </span>

              
                href={repo.url}
                target="_blank"
                className="text-blue-400 text-xs"
              <a>
                View →
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}