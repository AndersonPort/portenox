import { AnalysisResult } from "@/types/analysis";

export function generateMockAnalysis(
  text: string
): AnalysisResult {
  return {
    score: text.length > 100 ? 84 : 62,
    headline:
      "QA Analyst | API Testing | Jira | Agile | Automation Ready",
    suggestions: [
      "Add measurable achievements",
      "Include Selenium or Cypress",
      "Improve About section",
    ],
  };
}