import asyncHandler from "../utils/asycnHandler.js";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";
import { ApiResponse } from "../utils/ApiResponceHandling.js";


const learningRoadmap = asyncHandler(async (req, res, next) => {
    console.log(req.body);
});

export { learningRoadmap }