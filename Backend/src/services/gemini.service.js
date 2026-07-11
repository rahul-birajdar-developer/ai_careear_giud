import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const askGemini = async (resumeText, jobTitle) => {

    const prompt = `
You are an expert ATS Resume Analyzer and AI Career Coach.

Target Job Role:
${jobTitle}

Resume:
${resumeText}

Task:
Analyze this resume specifically for the target job role.

Evaluate:
1. ATS compatibility score (0-100).
2. Resume strengths.
3. Candidate's technical and soft skills.
4. Missing skills required for the target job.
5. Resume weaknesses.
6. Suggestions to improve the resume.
7. Career fit for the target job.
8. Short professional summary.

Rules:
- Return ONLY valid JSON.
- Do not use markdown.
- Do not use \`\`\`json.
- Use simple English.
- Keep each point under 15 words.
- Maximum:
  - 5 strengths
  - 8 skills
  - 8 missingSkills
  - 5 weaknesses
  - 5 suggestions
- Summary under 40 words.

Return exactly this JSON:

{
  "score": 0,
  "careerFit": "",
  "summary": "",
  "strengths": [],
  "skills": [],
  "missingSkills": [],
  "weaknesses": [],
  "suggestions": []
}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text;
};