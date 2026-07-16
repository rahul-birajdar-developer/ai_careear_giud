import { GoogleGenAI } from "@google/genai";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const askGemini = async (name, jobTitle, companyName, skills, desc, tone, length) => {

    try {
        const prompt = `
You are an expert HR recruiter and professional career coach.

Generate a ${tone} cover letter for the following job application.

IMPORTANT INSTRUCTIONS:
- Return ONLY the cover letter.
- Do NOT include explanations.
- Do NOT use markdown.
- Do NOT wrap the response in quotes.
- Do NOT add headings like "Cover Letter".
- Use a professional business letter format.
- Personalize the content based on the candidate's skills and the job description.
- Make the letter ATS-friendly.
- Keep the length ${length}.
- Write in clear, natural, and professional English.

Candidate Details:
Name: ${name}

Job Details:
Job Title: ${jobTitle}
Company: ${companyName}

Candidate Skills:
${skills}

Job Description:
${desc}

The cover letter should include:
1. A professional greeting.
2. An engaging opening paragraph.
3. A body highlighting relevant skills and experience.
4. A paragraph explaining why the candidate is interested in this company.
5. A strong closing paragraph with appreciation and a call to action.
6. A professional sign-off.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const coverText = response.text;
        if (!coverText) {
            new ApiErrorHandling(400, "Gemini returned an empty response.")
        }

        return coverText;
    } catch (error) {
        console.log(error)
    }
};