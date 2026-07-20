import { GoogleGenAI } from "@google/genai";
import { learningRoadmap } from "../prompts/roadMap.prompt.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateRoadmap = async (roadmapData) => {
    const prompt = learningRoadmap(roadmapData)
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    console.log(response.text);

    return response.text;
}

export default generateRoadmap;