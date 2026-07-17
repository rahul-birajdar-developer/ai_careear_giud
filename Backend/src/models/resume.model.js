import mongooes, { Schema } from "mongoose";

const resumeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    resumeUrl: {
        type: String,
        require: true
    },
    resumeFile: {
        type: String,
    },
    score: {
        type: Number,
    },
    strengths: {
        type: [String],
    },
    jobTitle: {
        type: String,
        require: true
    },
    skills: {
        type: [String]
    },
    missingSkills: {
        type: [String]
    },
    weaknesses: {
        type: [String],
    },
    suggestions: {
        type: [String]
    },
    summary: {
        type: [String]
    },
    careerFit: {
        type: [String]
    },
    atsScore: Number,
    atsLabel: String,
    atsMessage: String,

    keywordMatch: {
        pct: Number,
        label: String,
        color: String
    },

    formatting: {
        pct: Number,
        label: String,
        color: String
    },

    contentQuality: {
        pct: Number,
        label: String,
        color: String
    },

    skillsMatch: {
        pct: Number,
        label: String,
        color: String
    },

    pages: Number,
    wordCount: Number,
    readingTime: String,

    skillsFound: Number,
    missingSkillsCount: Number,
    keywordsPct: Number,

    actions: [{
        step: Number,
        title: String,
        desc: String
    }]
}, { timestamps: true })

export const ResumeModel = mongooes.model("Resume", resumeSchema)