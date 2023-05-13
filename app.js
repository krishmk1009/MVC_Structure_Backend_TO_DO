import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { config } from "dotenv";
import { errorMiddleWare } from "./middleware/error.js";


config({
    path: "./data/config.env"
})

const corsOptions = {
    origin: 'http://127.0.0.1:5173',
    credentials: true,
  };
export const app = express();
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())


//using routers
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tasks", taskRouter)

//using error middleware

app.use(errorMiddleWare)






