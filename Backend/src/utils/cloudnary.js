import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

// console.log("CLOUDINARY_CLOUD_NAME", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("CLOUDINARY_API_KEY", process.env.CLOUDINARY_API_KEY);
// console.log("CLOUDINARY_API_SECRET", process.env.CLOUDINARY_API_SECRET);

dotenv.config({
    path: "./.env"
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOncloudnary = async (filePath) => {
    try {
        if (!filePath) return null;

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        });

        // console.log("Cloudinary Response:", response);

        // Delete local file after successful upload
        fs.unlinkSync(filePath);

        return response;

    } catch (error) {
        console.error("========== CLOUDINARY ERROR ==========");
        console.error(error);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return null;
    }
};

export default uploadOncloudnary;