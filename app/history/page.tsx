import { prisma } from "@/app/lib/prisma";
import { Analysis } from "@prisma/client";


export default async function HistoryPage() {
  const analyses: Analysis[] = await prisma.analysis.findMany({
    orderBy: {createdAt: "desc"},
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Analysis History
      </h1>

      <div className="grid gap-4">
        {analyses.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
          >
            <div className="flex justify-between mb-3">
              <span className="text-xl font-semibold">
                Score: {item.score}
              </span>

              <span className="text-sm text-zinc-400">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </div>

            <p className="text-zinc-300 mb-2">
              {item.headline}
            </p>

            <p className="text-sm text-zinc-500 line-clamp-3">
              {item.rawText}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}