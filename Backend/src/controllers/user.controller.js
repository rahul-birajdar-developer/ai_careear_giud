import asyncHandler from "../utils/asycnHandler.js";
import { User } from "../models/user.models.js";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";
import { ApiResponse } from "../utils/ApiResponceHandling.js";
import uploadOncloudnary from "../utils/cloudnary.js";
import jwt from "jsonwebtoken";
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
        console.log("Refresh Token:", refreshToken);
        user.refreshToken = refreshToken;
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
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    // step 1 : get user details from frontend
    const { fullName, email, phone, password } = req.body;
    // console.log("req.body", req.body);
    // console.log("req.files", req.files);

    // step 2 : validation - not empty
    if (!fullName || !email || !phone || !password) {
        throw new ApiErrorHandling(400, "Please fill all the fields");
    }

    //Cheack for valid email format and phone number
    if (email && !email.includes("@")) {
        throw new ApiErrorHandling(400, "Please enter a valid email");
    }

    if (phone && !phone.match(/^[0-9]{10}$/)) {
        throw new ApiErrorHandling(400, "Please enter a valid phone number");
    }

    // step 3 : check if user already exists: username, email
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
        throw new ApiErrorHandling(400, "User already exists");
    }

    // upload the image in the cloudinary
    const profileImage = req.files?.profileImage?.[0]?.path;
    // console.log("profileImage", profileImage);
    if (!profileImage) {
        throw new ApiErrorHandling(400, "Profile image is required");
    }
    const uploadedImage = await uploadOncloudnary(profileImage);
    if (!uploadedImage) {
        throw new ApiErrorHandling(500, "Failed to upload profile image");
    }

    // step 4 : create user object - create entry in db
    // console.log(req.body);
    // console.log(uploadedImage);
    const user = await User.create({
        fullName,
        email,
        phone,
        password,
        profileImage: uploadedImage.url
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
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };

    // Return res
    return res.status(200)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("accessToken", accessToken, cookieOptions)
        .json({
            status: "success",
            message: "User logged in successfully",
            data: loggedInUser
        })
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
        sameSite: "strict"
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

// const forgetPassword = asyncHandler(async (req, res) => {
//     // get the email from the user 
//     const { email } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//         throw new ApiErrorHandling(404, "User Not Found");
//     }
//     //console.log("User : ", user)
//     //generate reset token to send the user
//     const resetToken = crypto.randomBytes(32).toString("hex");

//     user.resetPasswordToken = crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex");

//     user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
//     await user.save({ validateBeforeSave: false });
//     //reset link to send the user email
//     const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

//     await sendEmail({
//         email: user.email,
//         subject: "Password Reset",
//         message: `
//         Click the link below to reset your password:

//         ${resetLink}

//         This link expires in 15 minutes.
//     `
//     });

//     return res.status(200).json(
//         new ApiResponse(
//             200,
//             {},
//             "Password reset email sent successfully"
//         )
//     );
// })

const updateUserProfileImage = asyncHandler(async (req, res) => {
    // get the profile Image to change
    const profileImage = req.files?.profileImage?.[0]?.path;

    // console.log(profileImage);
    // console.log(profileImage);

    //cheack the profile image is upload or not
    if (!profileImage) {
        throw new ApiErrorHandling(400, "Upload a profile image ");
    }

    // upload the image to cloudinary
    const avatar = await uploadOncloudnary(profileImage);
    // console.log(avatar)

    if (!avatar) {
        throw new ApiErrorHandling(500, "Error occure when image upload on server")
    }

    //find the user
    const user = await User.findByIdAndUpdate(
        req.user?._id, {
        $set: {
            profileImage: avatar.url
        }
    },
        { returnDocument: "after" }
    ).select("-password")

    // console.log("User : ", user)

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Profile Image is upload successfully")
        )
})

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



export { userRegister, userLogin, userLogOut, refreshAccessToken, userChangePassword, updateUserProfileImage, userViewProfile }