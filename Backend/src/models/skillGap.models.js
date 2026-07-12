import mongoose from "mongoose";

const skillGapSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        targetRole: {
            type: String,
            required: true,
            trim: true,
        },

        experience: {
            type: String,
            required: true,
        },

        currentSkills: [
            {
                type: String,
                trim: true,
            },
        ],

        matchScore: {
            type: Number,
            default: 0,
        },

        strengths: [
            {
                type: String,
            },
        ],

        missingSkills: [
            {
                type: String,
            },
        ],

        learningPath: [
            {
                type: String,
            },
        ],

        estimatedTime: {
            type: String,
            default: "",
        },

        careerAdvice: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export const SkillGap = mongoose.model("SkillGap", skillGapSchema);