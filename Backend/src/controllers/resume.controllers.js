import asyncHandler from "../utils/asycnHandler.js";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";
import { ApiResponse } from "../utils/ApiResponceHandling.js";
import uploadOncloudnary from "../utils/cloudnary.js";
import { ResumeModel } from "../models/resume.model.js";
import { askGemini } from "../services/gemini.service.js";
import { extractResumeText } from "../services/extractText.service.js";

const getUserResume = asyncHandler(async (req, res) => {
    // console.log("Step 1")
    // console.log(req.files);
    // console.log(req.body);

    const file = req.files?.resumeFile?.[0];
    // console.log("Step 2")
    // console.log(file);

    const resumePath = file.path;
    const mimeType = file.mimetype;
    const extractText = await extractResumeText(
        resumePath,
        mimeType
    )

    // console.log("Step 3")
    // console.log(extractText);
    const analyze = await askGemini(extractText);
    // console.log("Step 4")
    // console.log(analyze);

    if (!resumePath) {
        throw new ApiErrorHandling(401, "Upload the resume")
    }

    const resumeUrl = await uploadOncloudnary(file.path);
    // console.log("Step 5")
    // console.log(resumeUrl.url)
    if (!resumeUrl) {
        throw new ApiErrorHandling(500, "Failed to upload resume");
    }

    const resumeData = await ResumeModel.create({
        id: req.user._id,
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