import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const askGemini = async (resumeText, jobTitle) => {

    const prompt = `
You are an expert ATS Resume Analyzer and Career Coach.

Analyze the following resume for the target role.

Target Job Role:
${jobTitle}

Resume Content:
${resumeText}

Instructions:

- Analyze the resume like an ATS system.
- Compare the resume with the target job role.
- Use the actual resume content to calculate all scores.
- Do NOT guess skills that are not present.
- Only list strengths found in the resume.
- Missing skills must be relevant to the target role.
- Suggestions should be practical and actionable.
- Calculate realistic ATS scores.
- Estimate page count.
- Calculate word count.
- Estimate reading time.
- Count the detected skills.
- Count missing skills.
- Calculate keyword match percentage.

Return ONLY valid JSON.

Do NOT return markdown.
Do NOT return explanations.
Do NOT wrap the JSON inside \`\`\`.
Do NOT include any extra text.

Return this exact JSON structure:

{
  "atsScore": 0,
  "atsLabel": "",
  "atsMessage": "",

  "keywordMatch": {
    "pct": 0,
    "label": "",
    "color": ""
  },

  "formatting": {
    "pct": 0,
    "label": "",
    "color": ""
  },

  "contentQuality": {
    "pct": 0,
    "label": "",
    "color": ""
  },

  "skillsMatch": {
    "pct": 0,
    "label": "",
    "color": ""
  },

  "pages": 0,
  "wordCount": 0,
  "readingTime": "",

  "skillsFound": 0,
  "missingSkillsCount": 0,
  "keywordsPct": 0,

  "summary": "",

  "careerFit": "",

  "strengths": [],

  "skills": [],

  "missingSkills": [],

  "weaknesses": [],

  "suggestions": [],

  "actions": [
    {
      "step": 1,
      "title": "",
      "desc": ""
    }
  ]
}

Scoring Rules:

ATS Score
90-100 : Excellent
75-89 : Good
60-74 : Average
40-59 : Needs Improvement
0-39 : Poor

Color Rules

90-100 → green
75-89 → blue
60-74 → amber
0-59 → red

Label Rules

90-100 → Excellent
75-89 → Good
60-74 → Average
40-59 → Needs Improvement
0-39 → Poor

Requirements:

1. atsMessage should explain why the ATS score was assigned.
2. summary should summarize the resume in 2-3 sentences.
3. careerFit should explain how suitable the candidate is for the target role.
4. strengths should contain only actual strengths found.
5. skills should contain all detected technical and soft skills.
6. missingSkills should contain only relevant missing skills.
7. weaknesses should contain resume problems.
8. suggestions should provide actionable improvements.
9. actions should contain 4-6 improvement steps ordered by priority.
10. Every score should be realistic and based only on the resume provided.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text;
};