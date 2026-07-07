
import connectDB from "./database/server.js";
import app from "./app.js";
import dns from "node:dns";
// console.log("Before:", dns.getServers());

dns.setServers(["8.8.8.8"]);

// console.log("After:", dns.getServers());


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server listening on port : ${process.env.PORT}`)
        })

        app.on("error", (error) => {
            console.log("Something Wrong : ", error);
            throw error
        })

    })
    .catch((error) => {
        console.log("Mongo db connection failed !! ", error)
    })