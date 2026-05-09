import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { runCareerAI } from "@/services/ai.service";
import mammoth from "mammoth";

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

    const formData = await req.formData();

    const linkedin = String(
      formData.get("linkedin") || ""
    );

    const goal = String(
      formData.get("goal") || ""
    );

    const file = formData.get(
      "resume"
    ) as File | null;

    let resumeText = "";

    if (file) {
      const bytes =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(bytes);

      if (
        file.name.endsWith(".pdf")
      ) {
        resumeText =
          "PDF upload detected. Parsing temporarily unavailable in current environment.";
      } else if (
        file.name.endsWith(
          ".docx"
        )
      ) {
        const doc =
          await mammoth.extractRawText(
            { buffer }
          );

        resumeText =
          doc.value;
      }
    }

    const ai =
      await runCareerAI(
        linkedin,
        resumeText,
        goal
      );

    const score = ai.score;
    const headline =
      ai.headline;

    const saved =
      await prisma.analysis.create({
        data: {
          rawText:
            linkedin +
            "\n\n" +
            resumeText,
          score,
          headline,
          userId: user.id,
        },
      });

    return NextResponse.json({
      id: saved.id,
      ...ai,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      { status: 500 }
    );
  }
}