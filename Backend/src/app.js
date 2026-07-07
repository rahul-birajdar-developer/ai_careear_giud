import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//import routes
import userRoute from "./routes/user.route.js"

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // React/Vite
    credentials: true,
}));

app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"))

app.use(cookieParser())


//declerartion of routes
app.use("/api/users", userRoute)
// app.use("/api/provider", userRoute)


export default app;