import axios from "axios";

export async function runCareerAI(
    linkedin: string,
    resumeText: string,
    goal: string
) {
    const sanitizedGoal = goal.replace(/[<>{}[\]]/g, ''); // Remove potentially dangerous chars
    
    const prompt = `
You are an elite recruiter and career strategist.

Analyze this candidate deeply.

LinkedIn URL: ${encodeURIComponent(linkedin)}

Resume: ${resumeText.substring(0, 5000)} // Limit input length

Career Goal: ${sanitizedGoal}

Return ONLY raw valid JSON with this exact structure...

Rules:
- score must be number from 0 to 100
- strengths must contain exactly 3 items
- gaps must contain exactly 3 items
- recommendations must contain exactly 3 items
- headline must be optimized for LinkedIn recruiters

Format:

{
  "score": 0,
  "headline": "",
  "strengths": ["","",""],
  "gaps": ["","",""],
  "recommendations": ["","",""]
}
`;

    const response =
        await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model:
                    "deepseek/deepseek-chat",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type":
                        "application/json",
                },
            }
        );

    const content =
        response.data.choices[0]
            .message.content;

    const cleaned =
        content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

    const parsed =
        JSON.parse(cleaned);

    return {
        score:
            parsed.score || 75,

        headline:
            parsed.headline ||
            "Strong Professional Profile",

        strengths:
            parsed.strengths || [],

        gaps:
            parsed.gaps || [],

        recommendations:
            parsed.recommendations || [],
    };
}