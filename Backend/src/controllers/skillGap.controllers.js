import asyncHandler from "../utils/asycnHandler.js";
import { ApiResponse } from "../utils/ApiResponceHandling.js";
import { askGemini } from "../services/geminiAiTool.service.js";
import { SkillGap } from "../models/skillGap.models.js";

const analyzeSkillGap = asyncHandler(async (req, res) => {

    const { targetRole, skills, experience } = req.body;

    if (!targetRole || !skills.length) {
        return res.status(400).json({
            success: false,
            message: "Role and skills are required."
        });
    }

    const prompt = `
You are an AI Career Coach.

Target Role:
${targetRole}

Current Skills:
${skills.join(", ")}

Experience:
${experience}

Return ONLY valid JSON.

{
 "matchScore":0,
 "strengths":[],
 "missingSkills":[],
 "learningPath":[],
 "estimatedTime":"",
 "careerAdvice":""
}

Rules:
- Simple English.
- Maximum 5 items.
- No markdown.
`;

    const response = await askGemini(prompt);

    const clean = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const result = JSON.parse(clean);

    const analysis = await SkillGap.create({
        user: req.user._id,
        targetRole,
        skills,
        experience,
        ...result
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            analysis,
            "Skill Gap Analyzed Successfully"
        )
    );
});

export { analyzeSkillGap };