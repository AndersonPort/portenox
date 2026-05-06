export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <p className="text-zinc-400 mt-2">
          Welcome to Portenox AI analytics.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-zinc-400">Profile Score</p>
            <h2 className="text-4xl font-bold mt-2">78</h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-zinc-400">Recruiter Visibility</p>
            <h2 className="text-4xl font-bold mt-2">Medium</h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-zinc-400">Missing Skills</p>
            <h2 className="text-4xl font-bold mt-2">3</h2>
          </div>
        </div>
      </div>
    </main>
  );
}