import { GoogleGenAI } from "@google/genai";
import { learningRoadmap } from "../prompts/roadMap.prompt.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateRoadmap = async ({ goal, exp, hours, duration, focus }) => {
    const prompt = learningRoadmap({
        goal,
        exp,
        hours,
        duration,
        focus,
    });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    // Depending on the SDK version, response.text may be a method or property.
    const raw =
        typeof response.text === "function"
            ? response.text()
            : response.text;

    console.log("Raw Gemini Response:\n", raw);

    const clean = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const roadmap = JSON.parse(clean);

    console.log("Parsed Roadmap:", roadmap);
    console.log(roadmap.stages);
    console.log(roadmap.stages[0].projects);
    console.log(typeof roadmap.stages[0].projects);

    return roadmap;
};

export default generateRoadmap;