export interface AnalysisResult {
  score: number;
  headline: string;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}