import asyncHandler from "../utils/asycnHandler.js";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";
import { ApiResponse } from "../utils/ApiResponceHandling.js";
import { askGemini } from "../services/coverLetter.service.js";
import { CoverLetterSchemaModel } from "../models/coverLetter.models.js";


const coverLetterGenerator = asyncHandler(async (req, res, next) => {
    const { name, jobTitle, companyName, skills, desc, tone, length } = req.body
    console.log(name, jobTitle, companyName, skills, desc, tone, length)

    if (!name || !jobTitle || !companyName || !skills || !desc || !tone || !length) {
        throw new ApiErrorHandling(400, "All fileds are required !! ");
    }

    const analyze = await askGemini(
        name,
        jobTitle,
        companyName,
        skills,
        desc,
        tone,
        length
    );

    const coverLetterData = await CoverLetterSchemaModel.create({
        user: req.user._id,
        name,
        jobTitle,
        companyName,
        skills,
        desc,
        tone,
        length,
        coverLetter: analyze,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                coverLetterData
            )
        )

})

export { coverLetterGenerator };