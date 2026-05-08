import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { generateMockAnalysis } from "@/services/analyze.service";

export async function POST(req: Request) {
  const body = await req.json();
  const text = body.text || "";

  const result = generateMockAnalysis(text);

  const savedAnalysis = await prisma.analysis.create({
    data: {
      rawText: text,
      score: result.score,
      headline: result.headline,
    },
  });

  return NextResponse.json({
    ...result,
    id: savedAnalysis.id,
  });
}