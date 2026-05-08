"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <section className="text-center max-w-4xl mx-auto">
          <p className="text-zinc-400 mb-4 text-sm uppercase tracking-widest">
            AI Career Growth Platform
          </p>

          <h1 className="text-6xl font-bold leading-tight mb-6">
            Optimize your LinkedIn profile
            <span className="block text-zinc-400">
              to attract recruiters.
            </span>
          </h1>

          <p className="text-zinc-400 text-xl mb-10">
            Personalized profile analysis,
            better headlines, stronger
            positioning and career growth
            powered by AI.
          </p>

          {!session ? (
            <button
              onClick={() => signIn("google")}
              className="bg-white text-black px-8 py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition"
            >
              Start with Google
            </button>
          ) : (
            <Link
              href="/dashboard"
              className="bg-white text-black px-8 py-4 rounded-2xl font-semibold text-lg inline-block"
            >
              Go to Dashboard
            </Link>
          )}
        </section>

        <section className="grid md:grid-cols-3 gap-6 mt-24">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-3">
              AI Analysis
            </h3>
            <p className="text-zinc-400">
              Understand how recruiters see
              your profile.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-3">
              Better Headlines
            </h3>
            <p className="text-zinc-400">
              Generate stronger professional
              positioning.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-3">
              Track Progress
            </h3>
            <p className="text-zinc-400">
              Save analyses and improve over
              time.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}