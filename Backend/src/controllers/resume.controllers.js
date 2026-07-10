import asyncHandler from "../utils/asycnHandler.js";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";
import { ApiResponse } from "../utils/ApiResponceHandling.js";
import uploadOncloudnary from "../utils/cloudnary.js";
import { ResumeModel } from "../models/resume.model.js";
import { askGemini } from "../services/gemini.service.js";
import { extractResumeText } from "../services/extractText.service.js";

const getUserResume = asyncHandler(async (req, res) => {
    console.log(req.files);
    console.log(req.body);

    const resumePath = req.files?.resumeFile?.[0]?.path;
    console.log(resumePath)

    const extractText = await extractResumeText(
        resumePath.path,
        resumePath.mimetype
    )

    console.log(extractText);
    const analyze = await askGemini(extractText);
    console.log(analyze);

    if (!resumePath) {
        throw new ApiErrorHandling(401, "Upload the resume")
    }

    const resumeUrl = await uploadOncloudnary(resumePath);
    console.log(resumeUrl.url)
    if (!resumeUrl) {
        throw new ApiErrorHandling(500, "Failed to upload resume");
    }

    const resumeData = await ResumeModel.create({
        id: req._id,
        resumeUrl: resumeUrl.url,
        resumeFile: resumePath,
        ...analyze,
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                resumeData,
                resumePath,
                resumeUrl: resumeUrl.url,
            },
            "Resume uploaded successfully!"
        )
    );
})

export { getUserResume, }