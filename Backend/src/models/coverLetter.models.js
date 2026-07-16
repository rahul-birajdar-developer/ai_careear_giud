import mongoose, { Schema } from "mongoose";

const coverLetterSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    tone: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
)

export const CoverLetterSchemaModel = mongoose.model("coverLetter", coverLetterSchema)