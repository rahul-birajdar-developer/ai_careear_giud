import mongooes, { Schema, Types } from "mongoose";

const resumeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    resumeUrl: {
        type: String,
    },
    fileName: {
        type: String,
    },
    resumeScore: {
        type: Number,
    },
    strengths: {
        type: [String],
    },
    weekness: {
        type: [String],
    },
    suggestions: {
        type: [String]
    }
}, { timestamps: true })

export const ResumeModel = mongooes.model("Resume", resumeSchema)