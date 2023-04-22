import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { errorMiddleWare } from "./middleware/error.js";

config({
    path: "./data/config.env"
})
export const app = express();
app.use(express.json())
app.use(cookieParser())

//using routers
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tasks", taskRouter)

//using error middleware

app.use(errorMiddleWare)






