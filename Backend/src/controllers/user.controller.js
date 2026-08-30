import asyncHandler from "../utils/asycnHandler.js";
import { User } from "../models/user.models.js";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";
import { ApiResponse } from "../utils/ApiResponceHandling.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
// import crypto from "crypto";
// import sendEmail from "../utils/sendEmails.js";

// Generate the access token and refresh toke when user login every time
const generateAccessTokenAndRefreshToken = async (userId) => {
    // console.log("Generating access and refresh token for userId:", userId);
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        // console.log("User found:", user);
        // Check if the user exists
        if (!user) {
            throw new ApiErrorHandling(404, "User not found");
        }
        // Generate access and refresh tokens to be used for authentication and authorization
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        // Store the refresh token in the user's document for future validation
        // console.log("Refresh Token:", refreshToken);
        user.refreshToken = refreshToken;
        user.accessToken = accessToken;
        // Save the user document with the new refresh token, bypassing validation to avoid potential issues with other fields
        await user.save({ validateBeforeSave: false });
        // Return the generated tokens to be sent back to the client for use in subsequent requests
        return { accessToken, refreshToken };
    } catch (error) {
        // Log the error for debugging purposes and throw a new ApiErrorHandling instance to indicate a server error
        console.error("Error while generating access and refresh token:", error);
        throw new ApiErrorHandling(500, "Error while generating access and refresh token");
    }
};

const userRegister = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    // step 1 : get user details from frontend
    const { name, email, password } = req.body;
    // console.log("req.body", req.body);
    //console.log("req.files", req.files);

    // step 2 : validation - not empty
    if (!name || !email || !password) {
        throw new ApiErrorHandling(400, "Please fill all the fields");
    }

    //Cheack for valid email format and phone number
    if (email && !email.includes("@")) {
        throw new ApiErrorHandling(400, "Please enter a valid email");
    }

    // if (phone && !phone.match(/^[0-9]{10}$/)) {
    //     throw new ApiErrorHandling(400, "Please enter a valid phone number");
    // }

    // step 3 : check if user already exists: username, email
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new ApiErrorHandling(400, "Email already exists");
    }
    const user = await User.create({
        userId: "U" + Date.now(),
        name,
        email,
        password,
    });
    // console.log("user", user.refreshToken);

    // step 5 : remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiErrorHandling(400, "Failed to create user");
    }

    // step 6 : return res
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    );
});

const userLogin = asyncHandler(async (req, res) => {
    console.log("LOGIN API HIT");
    console.log(req.body);
    // get user details from frontend
    // validation - not empty
    // check if user exists: username, email
    // check for password match
    // generate access token and refresh token
    // save refresh token in db
    // return res

    // get user details from frontend
    const { email, password, phone } = req.body;
    // console.log(req.body);

    if (!email && !phone) {
        throw new ApiErrorHandling(
            400,
            "Email or phone number is required"
        );
    }
    if (!password) {
        throw new ApiErrorHandling(400, "password is required ")
    }

    let user;
    if (email) {
        user = await User.findOne({ email });
    } else {
        user = await User.findOne({ phone });
    }

    // console.log(user);

    if (!user) {
        throw new ApiErrorHandling(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiErrorHandling(401, "Invalid credentials");
    }

    //call the generateAccessTokenAndRefreshToken function to generate access and refresh token
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    //find the logged in user and remove password and refresh token field from response
    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken");

    //set cookie options for refresh token and access token
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };

    // Return res
    return res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("accessToken", accessToken, cookieOptions)
        .json({
            success: true,
            message: "User logged in successfully",
            accessToken,
            refreshToken,
            user: loggedInUser,
        });
});

const userLogOut = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            returnDocument: "after"
        }
    );

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none"
    };

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
        if (!incomingRefreshToken) {
            throw new ApiErrorHandling(401, "unauthorized: Refresh token is missing");
        }

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiErrorHandling(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiErrorHandling(401, "Refresh token is expired or used")
        }
        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessTokenAndRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiErrorHandling(401, error?.message || "Invalid refresh token")
    }
})

const userChangePassword = asyncHandler(async (req, res) => {
    // get the user data from frontend
    const { oldPassword, newPassword } = req.body;
    // console.log("old password : ", oldPassword)
    // console.log("new Password : ", newPassword)

    //find the user in database
    const user = await User.findById(req.user?._id)
    // console.log(user)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    console.log("password Change successfully")

    if (!isPasswordCorrect) {
        throw new ApiErrorHandling(400, "Invalid Old Password !! ")
    }
    if (!oldPassword || !newPassword) {
        throw new ApiErrorHandling(400, "Both passwords are required");
    }

    if (oldPassword === newPassword) {
        throw new ApiErrorHandling(
            400,
            "New password cannot be the same as the old password"
        );
    }

    //if user find set the newPassword
    user.password = newPassword;
    // console.log(newPassword);
    // save the user
    await user.save();

    //give the responce to user
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully")
        )

});

const forgetPassword = asyncHandler(async (req, res) => {

    console.log("1. Forgot password request received");

    const { email } = req.body;

    console.log("2. Email:", email);

    const user = await User.findOne({
        email: email.trim().toLowerCase()
    });

    console.log("3. User found:", !!user);

    if (!user) {
        throw new ApiErrorHandling(
            404,
            "User Not Found"
        );
    }

    const resetToken = crypto
        .randomBytes(32)
        .toString("hex");

    user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.resetPasswordExpire =
        Date.now() + 15 * 60 * 1000;

    await user.save({
        validateBeforeSave: false
    });

    console.log("4. Token saved");

    const resetLink =
        `https://YOUR-WEBSITE.com/reset-password/${resetToken}`;

    console.log("5. Sending email...");

    await sendEmail({
        email: user.email,
        subject: "CareerMind AI - Password Reset",
        message: `
Click the link below to reset your password:

${resetLink}

This link expires in 15 minutes.
        `
    });

    console.log("6. Email sent");

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password reset email sent successfully"
        )
    );
});

const resetPassword = asyncHandler(async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    // 1. Validate password
    if (!password) {
        throw new ApiErrorHandling(
            400,
            "New password is required"
        );
    }

    // 2. Password validation
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        throw new ApiErrorHandling(
            400,
            "Password must contain 8+ characters, uppercase, lowercase, number and special character"
        );
    }

    // 3. Hash token received from URL
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // 4. Find user with valid token
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: {
            $gt: Date.now()
        }
    });

    if (!user) {
        throw new ApiErrorHandling(
            400,
            "Invalid or expired password reset link"
        );
    }

    // 5. Hash new password
    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    // 6. Update password
    user.password = hashedPassword;

    // 7. Remove reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password reset successfully"
        )
    );
});

const userViewProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id).select("-password -refreshToken")
    console.log(user)

    if (!user) {
        throw new ApiErrorHandling(404, "User not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "profile fetches all detail")
        )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User Fetch Successfully !! "
        ))
})

export { userRegister, userLogin, userLogOut, refreshAccessToken, userChangePassword, userViewProfile, getCurrentUser, forgetPassword, resetPassword }