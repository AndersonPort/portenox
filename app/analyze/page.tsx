"use client";

import { useState } from "react";

export default function AnalyzePage() {
  const [linkedin, setLinkedin] = useState("");
  const [goal, setGoal] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleAnalyze() {
    setLoading(true);

    const formData = new FormData();

    formData.append("linkedin", linkedin);
    formData.append("goal", goal);

    if (file) {
      formData.append("resume", file);
    }

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setResult(data);
    setLoading(false);
  }

  const score =
    result?.score || 0;

  const degree =
    (score / 100) * 360;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-100 text-zinc-900 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold text-violet-600 mb-3">
            AI Career Growth Platform
          </p>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Portenox AI Career Analyzer
          </h1>

          <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            Optimize your LinkedIn, identify growth gaps and unlock better opportunities with real AI insights.
          </p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-3xl shadow-xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-600">
              LinkedIn URL
            </label>

            <input
              value={linkedin}
              onChange={(e) =>
                setLinkedin(
                  e.target.value
                )
              }
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-600">
              Upload Resume (PDF / DOCX)
            </label>

            <input
              type="file"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] ||
                  null
                )
              }
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-600">
              Career Goal
            </label>

            <input
              value={goal}
              onChange={(e) =>
                setGoal(
                  e.target.value
                )
              }
              placeholder="QA Lead, Automation Engineer, Remote QA..."
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full rounded-2xl py-4 font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-95 transition"
          >
            {loading
              ? "Analyzing..."
              : "Analyze My Career"}
          </button>
        </div>

        {result && (
          <div className="mt-10 bg-white border border-zinc-200 rounded-3xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="flex justify-center">
                <div className="relative h-52 w-52 rounded-full flex items-center justify-center"
                  style={{
                    background: `conic-gradient(#7c3aed ${degree}deg, #e4e4e7 ${degree}deg)`,
                  }}
                >
                  <div className="h-40 w-40 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                    <p className="text-sm text-zinc-500">
                      Career Score
                    </p>

                    <p className="text-5xl font-bold">
                      {score}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-violet-600 mb-2">
                  Optimized Headline
                </p>

                <h2 className="text-3xl font-bold leading-tight mb-4">
                  {result.headline}
                </h2>

                <p className="text-zinc-600">
                  Your profile was analyzed using AI based on your resume, LinkedIn profile and career goals.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="font-bold mb-4 text-emerald-700">
                  Strengths
                </h3>

                <ul className="space-y-2 text-sm text-zinc-700">
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

              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
                <h3 className="font-bold mb-4 text-amber-700">
                  Gaps
                </h3>

                <ul className="space-y-2 text-sm text-zinc-700">
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

              <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
                <h3 className="font-bold mb-4 text-blue-700">
                  Recommendations
                </h3>

                <ul className="space-y-2 text-sm text-zinc-700">
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

            <div className="mt-10 rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">
                Unlock Pro Analysis
              </h3>

              <p className="opacity-90 mb-5">
                ATS score, full resume rewrite, salary positioning and unlimited AI reviews.
              </p>

              <button className="bg-white text-zinc-900 px-6 py-3 rounded-2xl font-semibold">
                Upgrade to Pro
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}