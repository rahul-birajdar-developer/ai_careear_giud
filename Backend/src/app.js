import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//import routes
import userRoute from "./routes/user.route.js"
import resumeRouter from "./routes/resume.route.js"

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://ai-careear-giud-jm1o.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            console.log("Origin:", origin);

            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("CORS Not Allowed"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"))

app.use(cookieParser())


//declerartion of routes
app.use("/api/users", userRoute)
// app.use("/api/provider", userRoute)
app.use("/api/resume", resumeRouter);

export default app;