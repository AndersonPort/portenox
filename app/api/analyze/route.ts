import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { generateMockAnalysis } from "@/services/analyze.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const text = body.text || "";

    const result = generateMockAnalysis(text);

    const saved = await prisma.analysis.create({
      data: {
        rawText: text,
        score: result.score,
        headline: result.headline,
        userId: user.id,
      },
    });

    return NextResponse.json({
      ...result,
      id: saved.id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}