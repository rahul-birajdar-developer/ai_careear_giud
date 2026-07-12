import { Router } from "express";
import verifyJwt from "../middlewares/auth.middleware.js";
import { analyzeSkillGap } from "../controllers/skillGap.controllers.js";

const router = Router();

router.post(
    "/analyze",
    verifyJwt,
    analyzeSkillGap
);

export default router;