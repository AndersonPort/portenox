import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { Analysis } from "@prisma/client";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/");
  }

  const analyses: Analysis[] =
    await prisma.analysis.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const total = analyses.length;

  const average =
    total > 0
      ? Math.round(
          analyses.reduce(
            (
              acc: number,
              item: Analysis
            ) => acc + item.score,
            0
          ) / total
        )
      : 0;

  const latest = analyses[0];

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400 text-sm mb-2">
              Total Analyses
            </p>
            <h2 className="text-4xl font-bold">
              {total}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400 text-sm mb-2">
              Average Score
            </p>
            <h2 className="text-4xl font-bold">
              {average}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400 text-sm mb-2">
              Last Score
            </p>
            <h2 className="text-4xl font-bold">
              {latest
                ? latest.score
                : "--"}
            </h2>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-400 text-sm mb-3">
            Latest Headline
          </p>

          <p className="text-lg">
            {latest
              ? latest.headline
              : "No analyses yet"}
          </p>
        </div>
      </div>
    </main>
  );
}