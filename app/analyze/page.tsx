import AnalysisDisplay from "./AnalysisDisplay";

type Repo = {
  id: number;
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
};

type Analysis = {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
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

async function getAnalysis(repos: Repo[]): Promise<Analysis> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ repos }),
    cache: "no-store",
  });

  const data = await res.json();
  return data as Analysis;
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
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Zeva
          </span>
          🤖: My Analysis for{" "}
          <span className="text-blue-400">{username}</span>
        </h1>

        <p className="text-gray-400 text-xs">Developed by Onyekachukwu Anene</p>

        {/*<p className="text-gray-400 text-sm mt-1">
          AI-powered GitHub portfolio feedback
        </p>*/}
      </div>

      <AnalysisDisplay analysis={analysis} repos={repos} />
    </main>
  );
}