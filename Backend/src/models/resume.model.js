import mongooes, { Schema} from "mongoose";

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
    resumeScore: {
        type: Number,
    },
    strengths: {
        type: [String],
    },
    Skill: {
        type: [String]
    },
    weekness: {
        type: [String],
    },
    suggestions: {
        type: [String]
    }
}, { timestamps: true })

export const ResumeModel = mongooes.model("Resume", resumeSchema)