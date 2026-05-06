import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const text = body.text || "";

  const result = {
    score: text.length > 100 ? 84 : 62,
    headline:
      "QA Analyst | API Testing | Jira | Agile | Automation Ready",
    suggestions: [
      "Add measurable achievements",
      "Include Selenium or Cypress",
      "Improve About section",
    ],
  };

  return NextResponse.json(result);
}