import asyncHandler from "../utils/asycnHandler.js";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";
import { ApiResponse } from "../utils/ApiResponceHandling.js";


const coverLetterGenerator = async (req, res, next) => {
    const { name, jobTitle, } = req.body()
}

export { coverLetterGenerator };