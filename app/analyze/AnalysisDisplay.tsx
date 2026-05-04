"use client";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

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

type Props = {
  analysis: Analysis;
  repos: Repo[];
};

function ScoreGauge({ score }: { score: number }) {
  const data = [{ name: "Score", value: (score / 10) * 100 }];

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
        Portfolio Score
      </h3>
      <div className="relative w-40 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
            data={data}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={8}
              background={{ fill: "#1f2937" }}
              fill="#818cf8"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-white">{score}</span>
          <span className="text-xs text-gray-400">/ 10</span>
        </div>
      </div>
    </div>
  );
}

function CategoryChart({
  strengths,
  weaknesses,
  improvements,
}: {
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
}) {
  const data = [
    { label: "Strengths", count: strengths.length, fill: "#34d399" },
    { label: "Weaknesses", count: weaknesses.length, fill: "#f87171" },
    { label: "Improvements", count: improvements.length, fill: "#60a5fa" },
  ];

  return (
    <div className="flex flex-col gap-2 flex-1">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
        Feedback Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} barSize={36}>
          <XAxis
            dataKey="label"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #374151",
              borderRadius: 8,
              color: "#f9fafb",
              fontSize: 12,
            }}
            formatter={(value: number) => [value, "items"]}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ItemList({
  title,
  items,
  accent,
  icon,
}: {
  title: string;
  items: string[];
  accent: string;
  icon: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <h3 className={`text-sm font-semibold uppercase tracking-wider ${accent}`}>
        {icon} {title}
      </h3>
      <ul className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm text-gray-300 bg-gray-800/60 rounded-lg px-4 py-2 border border-gray-700/50"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div className="p-5 bg-gray-900/70 border border-gray-800 rounded-xl">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">{repo.name}</h2>
        <span className="text-sm text-gray-400">⭐ {repo.stars}</span>
      </div>
      <p className="text-gray-400 text-sm mt-2">
        {repo.description || "No description"}
      </p>
      <div className="flex justify-between mt-4">
        <span className="text-xs text-gray-500">{repo.language || "Unknown"}</span>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 text-xs hover:underline"
        >
          View Repo →
        </a>
      </div>
    </div>
  );
}

export default function AnalysisDisplay({ analysis, repos }: Props) {
  return (
    <>
      <div className="mb-8 p-6 bg-gray-900/70 border border-gray-800 rounded-2xl">
        <h2 className="text-xl font-semibold mb-5">
          AI-powered GitHub portfolio feedback
        </h2>

        <div className="flex flex-col sm:flex-row items-start gap-8 mb-6">
          <ScoreGauge score={analysis.score} />
          <CategoryChart
            strengths={analysis.strengths}
            weaknesses={analysis.weaknesses}
            improvements={analysis.improvements}
          />
        </div>

        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          {analysis.summary}
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <ItemList
            title="Strengths"
            items={analysis.strengths}
            accent="text-emerald-400"
            icon="✓"
          />
          <ItemList
            title="Weaknesses"
            items={analysis.weaknesses}
            accent="text-red-400"
            icon="✗"
          />
          <ItemList
            title="Improvements"
            items={analysis.improvements}
            accent="text-blue-400"
            icon="↑"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </>
  );
}
