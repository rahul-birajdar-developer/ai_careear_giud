import asyncHandler from "../utils/asycnHandler.js";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";
import { ApiResponse } from "../utils/ApiResponceHandling.js";
import generateRoadmap from "../services/generateRoadMap.service.js";



const learningRoadmap = asyncHandler(async (req, res, next) => {
    // console.log(req.body);
    const { goal, exp, hours, duration, focus } = req.body;
    // console.log(goal, exp, hours, duration, focus)

    if (!goal || !exp || !hours || !duration || !focus) {
        throw new ApiErrorHandling(400, "All Field Are Required !!")
    }
    const getRoadmap = generateRoadmap(goal, exp, hours, duration, focus);
    console.log(getRoadmap);
    return res.status(200).json(
        new ApiResponse(200, getRoadmap, "Roadmap generated successfully")
    );
});

export { learningRoadmap }