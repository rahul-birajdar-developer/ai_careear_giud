import asyncHandler from "../utils/asycnHandler.js";
import ApiErrorHandling from "../utils/ApiErrorHandling.js";
import { ApiResponse } from "../utils/ApiResponceHandling.js";
import generateRoadmap from "../services/generateRoadMap.service.js";
import { Roadmap } from "../models/learningRoadmap.models.js";



const learningRoadmap = asyncHandler(async (req, res, next) => {
    // console.log(req.body);
    const { goal, exp, hours, duration, focus } = req.body;
    // console.log(goal, exp, hours, duration, focus)

    if (!goal || !exp || !hours || !duration || !focus) {
        throw new ApiErrorHandling(400, "All Field Are Required !!")
    }
    // console.log({
    //     goal,
    //     exp,
    //     hours,
    //     duration,
    //     focus,
    // });
    const getRoadmap = await generateRoadmap({ goal, exp, hours, duration, focus });
    // console.log("getRoadmap:", getRoadmap);
    // console.log("Type:", typeof getRoadmap);
    // console.log("getRoadmap =", getRoadmap);
    // console.log("keys =", Object.keys(getRoadmap));
    // console.log("goal =", getRoadmap.goal);
    // console.log("experience =", getRoadmap.experience);
    // console.log("stages =", getRoadmap.stages);
    // console.log("stages length =", getRoadmap.stages?.length);

    const roadmapData = await Roadmap.create({
        user: req.user._id,
        goal: getRoadmap.goal,
        experience: getRoadmap.experience,
        estimatedTime: getRoadmap.estimatedTime,
        weeklyCommitment: getRoadmap.weeklyCommitment,
        totalTopics: getRoadmap.totalTopics,
        totalResources: getRoadmap.stages.reduce(
            (sum, stage) => sum + stage.resources.length,
            0
        ),
        totalProjects: getRoadmap.stages.reduce(
            (sum, stage) => sum + stage.projects.length,
            0
        ),
        stages: getRoadmap.stages,
        finalGoal: getRoadmap.finalGoal,
        proTip: getRoadmap.proTip,
        //user input
        careerGoal: goal,
        weeklyHours: hours,
        preferredDuration: duration,
        focusAreas: focus
    })

    return res.status(200).json(
        new ApiResponse(200, roadmapData, "Roadmap generated successfully")
    );
});

export { learningRoadmap }