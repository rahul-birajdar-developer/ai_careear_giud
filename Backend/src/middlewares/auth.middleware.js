import asyncHandler from "../utils/asycnHandler.js";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const verifyJwt = asyncHandler(async (req, res, next) => {

    try {
        const token =
            req.cookies?.accessToken ||
            req.headers.authorization?.replace("Bearer ", "");
    
        if (!token) {
            throw new ApiErrorHandling(401, "Unauthorized user");
        }
    
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
    
        const user = await User.findById(decoded._id)
            .select("-password -refreshToken");
    
        if (!user) {
            throw new ApiErrorHandling(401, "Invalid access token");
        }
    
        req.user = user;
    
        next();
    } catch (error) {
        throw new ApiErrorHandling(401, "Invalid or expired access token");
    }
});

export default verifyJwt;