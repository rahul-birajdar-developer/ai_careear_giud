import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        sparse: true
    },

    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10}$/,
    },

    password: {
        type: String,
        required: true
    },

    profileImage: String,

    isVerified: {
        type: Boolean,
        default: false
    },

    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
}, { timestamps: true });

//password bcrypt method when user enter the password
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
});


//cheak the password is correct or not
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        },
    );
};

//generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        },
    );
};

export const User = mongoose.model("User", userSchema);