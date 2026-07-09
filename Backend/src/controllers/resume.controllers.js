import asyncHandler from "../utils/asycnHandler.js";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";
import { ApiResponse } from "../utils/ApiResponceHandling.js";
import uploadOncloudnary from "../utils/cloudnary.js";
import { ResumeModel } from "../models/resume.model.js";

const getUserResume = asyncHandler(async (req, res) => {
    console.log(req.files);
    console.log(req.body);

    const resumePath = req.files?.resumeFile?.[0]?.path;
    console.log(resumePath)

    if (!resumePath) {
        throw new ApiErrorHandling(401, "Upload the resume")
    }

    const resumeUrl = await uploadOncloudnary(resumePath);
    console.log(resumeUrl.url)
    if (!resumeUrl) {
        throw new ApiErrorHandling(500, "Failed to upload resume");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                resumePath,
                resumeUrl: resumeUrl.url,
            },
            "Resume uploaded successfully!"
        )
    );
})

export { getUserResume, }