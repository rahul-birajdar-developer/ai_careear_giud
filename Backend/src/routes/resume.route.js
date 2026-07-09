import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/auth.middleware.js";
import { getUserResume } from "../controllers/resume.controllers.js";

const roter = Router();

roter.route("/resume").post(verifyJwt, upload.fields([{ name: "resumeFile", maxCount: 1 }]), getUserResume)