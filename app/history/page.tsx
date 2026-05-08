import { prisma } from "@/app/lib/prisma";
import { Analysis } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";


export default async function HistoryPage() {
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

  const analyses: Analysis[] = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          My History
        </h1>

        {analyses.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            No analyses yet.
          </div>
        ) : (
          <div className="space-y-4">
            {analyses.map((item: Analysis) => (
              <div
                key={item.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
              >
                <div className="flex justify-between mb-3">
                  <span className="text-zinc-400 text-sm">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </span>

                  <span className="font-bold text-xl">
                    Score {item.score}
                  </span>
                </div>

                <p className="text-lg">
                  {item.headline}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}