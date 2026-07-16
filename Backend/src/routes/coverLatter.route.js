import { Router } from "express";
import verifyJwt from "../middlewares/auth.middleware.js";
import { coverLetterGenerator } from "../controllers/coverLetter.controllers.js";

const router = Router();

router.route("/analyze").post(verifyJwt, coverLetterGenerator)

export default router 