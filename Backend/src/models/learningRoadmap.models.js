import mongoose, { Schema } from "mongoose";

const stageSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        duration: {
            type: String,
            required: true,
            trim: true,
        },

        desc: {
            type: String,
            required: true,
            trim: true,
        },

        tags: [
            {
                type: String,
                trim: true,
            },
        ],

        progress: {
            type: Number,
            default: 0,
            min: 0,
        },

        total: {
            type: Number,
            required: true,
        },

        resources: {
            type: Number,
            required: true,
        },

        projects: {
            type: Number,
            required: true,
        },

        subtopics: [
            {
                type: String,
                trim: true,
            },
        ],
    },
    { _id: false }
);

const roadmapSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        goal: {
            type: String,
            required: true,
            trim: true,
        },

        experience: {
            type: String,
            required: true,
            trim: true,
        },

        estimatedTime: {
            type: String,
            required: true,
        },

        weeklyCommitment: {
            type: String,
            required: true,
        },

        totalTopics: {
            type: Number,
            default: 0,
        },

        totalResources: {
            type: Number,
            default: 0,
        },

        totalProjects: {
            type: Number,
            default: 0,
        },

        stages: {
            type: [stageSchema],
            required: true,
            validate: {
                validator: (value) => value.length === 6,
                message: "Roadmap must contain exactly 6 stages.",
            },
        },

        finalGoal: {
            type: String,
            required: true,
        },

        proTip: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Roadmap = mongoose.model("Roadmap", roadmapSchema);