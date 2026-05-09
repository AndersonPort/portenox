import axios from "axios";

export async function runCareerAI(
    linkedin: string,
    resumeText: string,
    goal: string
) {
    const prompt = `
You are an elite recruiter and career strategist.

Analyze this candidate.

LinkedIn URL:
${linkedin}

Resume:
${resumeText}

Career Goal:
${goal}

Return ONLY valid JSON:

{
  "score": number,
  "headline": "improved linkedin headline",
  "strengths": ["item1","item2"],
  "gaps": ["item1","item2"],
  "recommendations": ["item1","item2"]
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

    return JSON.parse(cleaned);
}