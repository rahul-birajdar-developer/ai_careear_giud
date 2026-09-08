import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const askGemini = async (resumeText, jobTitle) => {

  const prompt = `
You are an expert ATS Resume Analyzer and Career Coach.

Analyze the following resume specifically for the target job role.

Target Job Role:
${jobTitle}

Resume Content:
${resumeText}

IMPORTANT:
Base EVERY result only on the provided resume and target job role.

Do NOT invent, assume, or guess:
- Skills
- Experience
- Projects
- Achievements
- Education
- Certifications
- Job responsibilities
- Technologies

If information is not present in the resume, do not claim that it exists.

==================================================
ANALYSIS REQUIREMENTS
==================================================

1. ATS SCORE

Calculate an overall ATS score from 0-100.

Consider:
- Keyword relevance
- Skills match
- Resume formatting
- Content quality
- Experience relevance
- Job-role alignment
- Resume completeness

Use realistic scoring.

Score ranges:

90-100 = Excellent
75-89 = Good
60-74 = Average
40-59 = Needs Improvement
0-39 = Poor


2. KEYWORD MATCH

Compare important keywords from the target job role with keywords actually present in the resume.

Do NOT count unrelated words.

Return a percentage from 0-100.

Example:
If 7 of 10 important job-related keywords are present,
keyword match should be approximately 70.


3. FORMATTING SCORE

Evaluate ATS-friendly formatting based only on the extracted resume content.

Consider:
- Clear section structure
- Consistent headings
- Readability
- Dates
- Contact information
- Bullet-point usage
- Unnecessary formatting
- Tables or unusual structures if detectable

Do not penalize formatting that cannot be determined from extracted text.


4. CONTENT QUALITY

Evaluate:
- Professional summary
- Experience descriptions
- Project descriptions
- Achievements
- Quantifiable results
- Relevance
- Clarity
- Completeness


5. SKILLS MATCH

Compare the candidate's detected skills with skills relevant to the target role.

Only use skills actually present in the resume.

Do not invent skills.


6. CAREER FIT

Explain how suitable the candidate appears for the target role.

Use only evidence from the resume.

Mention:
- Relevant skills
- Relevant projects
- Relevant experience
- Major gaps

Keep this concise.


7. SUMMARY

Write a professional 2-3 sentence summary of the resume.

Do not add information that is not present.


8. STRENGTHS

List only genuine strengths supported by the resume.

Examples:
- Relevant technical skills
- Relevant projects
- Strong educational background
- Relevant experience
- Certifications
- Quantifiable achievements

Do not create generic strengths without evidence.


9. SKILLS

Extract all clearly identifiable:
- Technical skills
- Programming languages
- Frameworks
- Libraries
- Databases
- Tools
- Platforms
- Soft skills
- Languages

Do not infer skills.


10. MISSING SKILLS

Identify skills that are relevant to the target job role but are NOT clearly present in the resume.

Only include skills that are genuinely relevant to the target role.

Do not list random technologies.


11. WEAKNESSES

Identify actual problems in the resume.

Examples:
- Missing measurable achievements
- Weak summary
- Missing important sections
- Poor project descriptions
- Missing relevant keywords
- Incomplete experience details
- Inconsistent dates

Do not repeat strengths.


12. SUGGESTIONS

Provide practical recommendations for improving the resume.

Suggestions should explain WHAT the user should improve and HOW.


13. ACTIONS

Create 4-6 prioritized improvement steps.

Order them from highest priority to lowest priority.

Each action must contain:

step
title
desc

Example:

{
  "step": 1,
  "title": "Improve Professional Summary",
  "desc": "Rewrite the summary to clearly mention your target role, strongest relevant skills, and career focus."
}


14. RESUME STATISTICS

Calculate or estimate:

pages
wordCount
readingTime
skillsFound
missingSkillsCount
keywordsPct

Word count should be based on the provided resume text.

Reading time should be estimated using approximately 200-250 words per minute.

Page count should be estimated from the amount of provided resume content.


==================================================
COLOR RULES
==================================================

For each score:

90-100:
label = "Excellent"
color = "green"

75-89:
label = "Good"
color = "blue"

60-74:
label = "Average"
color = "amber"

40-59:
label = "Needs Improvement"
color = "red"

0-39:
label = "Poor"
color = "red"


==================================================
IMPORTANT CONSISTENCY RULES
==================================================

- atsScore must be consistent with atsLabel.
- keywordMatch.pct must equal keywordsPct.
- skillsFound must equal the number of items in skills.
- missingSkillsCount must equal the number of items in missingSkills.
- All percentages must be integers between 0 and 100.
- Do not use information outside the provided resume and target role.
- Do not duplicate the same item unnecessarily.
- Keep recommendations practical.
- Keep careerFit concise.
- Keep summary to 2-3 sentences.
- actions must contain 4-6 items.


==================================================
RETURN FORMAT
==================================================

Return ONLY valid JSON.

Do NOT return markdown.
Do NOT return explanations.
Do NOT wrap JSON inside \`\`\`.
Do NOT include any text before or after the JSON.

Return exactly:

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
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);

  return response.text;
};