export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">
          Portenox AI
        </p>

        <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-tight">
          Be Found by Recruiters.
        </h1>

        <p className="mt-6 text-xl text-zinc-300 max-w-2xl">
          Portenox analyzes your professional profile, improves visibility,
          optimizes keywords and helps you attract better opportunities.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="/dashboard"
            className="px-6 py-3 rounded-2xl bg-white text-black font-semibold"
          >
            Start Free
          </a>

          <a
            href="#features"
            className="px-6 py-3 rounded-2xl border border-zinc-700"
          >
            Learn More
          </a>
        </div>
      </section>

      <section
        id="features"
        className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-6"
      >
        <div className="p-6 rounded-2xl bg-zinc-900">
          <h3 className="text-xl font-semibold">AI Profile Score</h3>
          <p className="mt-3 text-zinc-400">
            Understand how attractive your profile is to recruiters.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900">
          <h3 className="text-xl font-semibold">Keyword Optimization</h3>
          <p className="mt-3 text-zinc-400">
            Improve search visibility in recruiter systems.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900">
          <h3 className="text-xl font-semibold">Career Growth Plan</h3>
          <p className="mt-3 text-zinc-400">
            Discover the next skills to level up your career.
          </p>
        </div>
      </section>
    </main>
  );
}