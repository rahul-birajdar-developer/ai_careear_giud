import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/auth.middleware.js";
import { getUserResume } from "../controllers/resume.controllers.js";

const router = Router();

router.post(
    "/upload",
    (req, res, next) => {
        console.log("✅ Route hit");
        next();
    },
    verifyJwt,
    upload.fields([{ name: "resumeFile", maxCount: 1 }]),
    getUserResume
);

export default router;