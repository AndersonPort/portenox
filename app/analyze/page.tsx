"use client";

import { useState } from "react";

export default function AnalyzePage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    setLoading(true);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold">
          Analyze Your Profile
        </h1>

        <p className="text-zinc-400 mt-2">
          Paste your LinkedIn text and receive AI insights.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste profile text here..."
          className="w-full h-64 mt-8 p-4 rounded-2xl bg-zinc-900 border border-zinc-800"
        />

        <button
          onClick={handleAnalyze}
          className="mt-6 px-6 py-3 bg-white text-black rounded-2xl font-semibold"
        >
          {loading ? "Analyzing..." : "Analyze Now"}
        </button>

        {result && (
          <div className="mt-10 bg-zinc-900 p-6 rounded-2xl space-y-4">
            <div>
              <p className="text-zinc-400">Profile Score</p>
              <h2 className="text-4xl font-bold">{result.score}</h2>
            </div>

            <div>
              <p className="text-zinc-400">Optimized Headline</p>
              <p>{result.headline}</p>
            </div>

            <div>
              <p className="text-zinc-400">Suggestions</p>
              <ul className="list-disc pl-6">
                {result.suggestions.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}