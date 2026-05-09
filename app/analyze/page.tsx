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

  async function handleAnalyze() {
    setLoading(true);

    const formData = new FormData();

    formData.append(
      "linkedin",
      linkedin
    );

    formData.append("goal", goal);

    if (file) {
      formData.append("resume", file);
    }

    const res = await fetch(
      "/api/analyze",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    console.log(data);

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
              Upload Resume (PDF/DOCX)
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
              placeholder="QA Lead, Remote QA, Automation Engineer..."
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
      </div>
    </main>
  );
}