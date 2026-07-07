import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

export async function askGemini(prompt) {
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error(error);
        return "Error occurred";
    }
}