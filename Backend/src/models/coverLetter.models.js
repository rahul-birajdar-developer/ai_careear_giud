import mongoose, { Schema } from "mongoose";

const coverLetterSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    name: {
        type: String,
        require: true,
    },
    jobTitle: {
        type: String,
        require: true,
    },
    skills: {
        type: [String],
        require: true,
    },
    desc: {
        type: String,
        require: true
    },
    tone: {
        type: String,
        require: true
    },
    lenght: {
        type: String,
        require: true
    }
},
    {
        timestamps: true,
    }
)

export const coverLetterSchemaModel = mongoose.model("coverLetter", coverLetterSchema)