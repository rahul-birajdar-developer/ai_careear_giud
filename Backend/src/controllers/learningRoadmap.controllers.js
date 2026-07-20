import asyncHandler from "../utils/asycnHandler.js";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";
import { ApiResponse } from "../utils/ApiResponceHandling.js";


const learningRoadmap = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const { goal, exp, hours, duration, focus } = req.body;
    console.log(goal, exp, hours, duration, focus)
});

export { learningRoadmap }