import { Router } from "express";
import verifyJwt from "../middlewares/auth.middleware.js";
import { learningRoadmap } from "../controllers/learningRoadmap.controllers.js";

const route = Router();

route.route("/roadmap").post(verifyJwt, learningRoadmap)

export default route;