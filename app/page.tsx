"use client";
// app/page.tsx

import { useState } from "react";
import Link from "next/link"; // Add this import

// Main page component
export default function Home() {
  const [username, setUsername] = useState("");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none" />

      <div className="relative text-center max-w-xl w-full space-y-8">
        <h1 className="text-5xl font-bold leading-tight">
          Turn Your GitHub Into
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {" "}
            Job Offers
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Meet Zeva
          </span>
          🤖: "I give AI-powered insights to boost your portfolio and land jobs
          faster — enter your GitHub username and get surprised!"
        </p>

        {/* Input */}
        <div className="flex items-center border border-gray-700 bg-gray-900/60 backdrop-blur rounded-xl overflow-hidden shadow-lg">
          <span className="px-4 py-3 text-gray-500 border-r border-gray-800">
            github.com/
          </span>
          <input
            type="text"
            placeholder="your-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 bg-transparent p-3 outline-none text-white placeholder-gray-600"
          />
        </div>

        {/* Button - CHANGED TO LINK */}
        {username ? (
          <Link
            href={`/analyze?username=${username}`}
            className="block w-full py-3 rounded-xl font-medium transition bg-white text-black hover:scale-[1.02]"
          >
            Analyze My GitHub →
          </Link>
        ) : (
          <button
            disabled
            className="block w-full py-3 rounded-xl font-medium transition bg-gray-700 text-gray-400 cursor-not-allowed"
          >
            Analyze My GitHub →
          </button>
        )}
      </div>
      <p className="absolute bottom-4 text-xs text-gray-500">
        Developed by: Onyekachukwu Anene
      </p>
    </main>
  );
}
