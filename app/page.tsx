"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-3xl font-bold">AI Dev Copilot</h1>

      <p className="text-gray-500 text-center max-w-md">
        Analyze your GitHub profile and get insights to improve your chances of
        getting hired.
      </p>

      {/* Input with prefix */}
      <div className="flex items-center border rounded overflow-hidden">
        <span className="bg-gray-100 px-3 py-2 text-gray-600 border-r mr-2">
          github.com/
        </span>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 outline-none"
        />
      </div>

      <a
        href={`/analyze?username=${username}`}
        className="bg-black text-white px-5 py-2 rounded"
      >
        Analyze
      </a>
    </main>
  );
}
