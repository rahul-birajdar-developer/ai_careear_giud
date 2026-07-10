import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const askGemini = async (resumeText) => {

    const prompt = `
You are an ATS Resume Analyzer.

Analyze this resume.

Return ONLY JSON.

{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "skills": [],
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