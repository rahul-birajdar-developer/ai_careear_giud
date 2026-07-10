import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const askGemini = async (resumeText) => {

    const prompt = `
You are an ATS Resume Analyzer.

Analyze the resume and return ONLY valid JSON.

Rules:
- Use simple English.
- Keep each point short (10–15 words maximum).
- Do not use difficult vocabulary.
- Do not use bold text or markdown.
- Return a maximum of:
  - 5 strengths
  - 8 skills
  - 5 weaknesses
  - 5 suggestions
- Keep the summary under 40 words.

Return only this JSON:

{
  "score": 0,
  "strengths": [],
  "skills": [],
  "weaknesses": [],
  "suggestions": [],
  "careerFit": "",
  "summary": ""
}
Resume:

${resumeText}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text;
};