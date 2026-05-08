"use client";

import { useState } from "react";

export default function AnalyzePage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleAnalyze() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setResult(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Analyze Your Profile
        </h1>

        <p className="text-zinc-400 mb-8">
          Paste your LinkedIn summary, experience or profile text.
        </p>

        <textarea
          className="w-full h-56 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 outline-none"
          placeholder="Paste your profile here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-5 w-full bg-white text-black font-semibold py-4 rounded-2xl hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Now"}
        </button>

        {result && (
          <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="text-3xl font-bold">
              Score: {result.score}
            </div>

            <div>
              <p className="text-zinc-400 text-sm mb-1">
                Suggested Headline
              </p>
              <p>{result.headline}</p>
            </div>

            <div>
              <p className="text-zinc-400 text-sm mb-2">
                Recommendations
              </p>

              <ul className="space-y-2">
                {result.suggestions.map(
                  (item: string, index: number) => (
                    <li
                      key={index}
                      className="bg-zinc-800 px-3 py-2 rounded-xl"
                    >
                      {item}
                    </li>
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