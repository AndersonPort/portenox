"use client";

import { useState } from "react";

export default function AnalyzePage() {
  const [linkedin, setLinkedin] =
    useState("");

  const [goal, setGoal] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  async function handleAnalyze() {
    setLoading(true);

    const formData = new FormData();

    formData.append(
      "linkedin",
      linkedin
    );

    formData.append("goal", goal);

    if (file) {
      formData.append(
        "resume",
        file
      );
    }

    const res = await fetch(
      "/api/analyze",
      {
        method: "POST",
        body: formData,
      }
    );

    const data =
      await res.json();

    setResult(data);

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">
          Analyze Your Career
        </h1>

        <div className="space-y-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div>
            <label className="block mb-2 text-sm text-zinc-400">
              LinkedIn URL
            </label>

            <input
              value={linkedin}
              onChange={(e) =>
                setLinkedin(
                  e.target.value
                )
              }
              placeholder="https://linkedin.com/in/..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-400">
              Upload Resume
            </label>

            <input
              type="file"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] ||
                  null
                )
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-400">
              Career Goal
            </label>

            <input
              value={goal}
              onChange={(e) =>
                setGoal(
                  e.target.value
                )
              }
              placeholder="QA Lead, Automation Engineer..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-4 rounded-2xl"
          >
            {loading
              ? "Analyzing..."
              : "Analyze My Career"}
          </button>
        </div>

        {result && (
          <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">
              Analysis Result
            </h2>

            <div className="mb-6">
              <p className="text-zinc-400 text-sm">
                Score
              </p>
              <p className="text-5xl font-bold">
                {result.score}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-zinc-400 text-sm mb-2">
                Optimized Headline
              </p>
              <p className="text-xl">
                {result.headline}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="font-semibold mb-2">
                  Strengths
                </p>

                <ul className="space-y-2 text-zinc-300">
                  {result.strengths?.map(
                    (
                      item: string,
                      index: number
                    ) => (
                      <li key={index}>
                        • {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">
                  Gaps
                </p>

                <ul className="space-y-2 text-zinc-300">
                  {result.gaps?.map(
                    (
                      item: string,
                      index: number
                    ) => (
                      <li key={index}>
                        • {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">
                  Recommendations
                </p>

                <ul className="space-y-2 text-zinc-300">
                  {result.recommendations?.map(
                    (
                      item: string,
                      index: number
                    ) => (
                      <li key={index}>
                        • {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}