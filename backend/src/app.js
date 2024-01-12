import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"))


// import routes
import userRouter from "./routes/user.routes.js"
import teacherRouter from "./routes/teacher.routes.js"
import studentRouter from "./routes/student.routes.js"
import studentSubject from "./routes/subject.routes.js"
import classRouter from "./routes/class.routes.js"


// use routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/teacher", teacherRouter)
app.use("/api/v1/student", studentRouter)
app.use("/api/v1/subject", studentSubject)
app.use("/api/v1/class", classRouter)


export  { app };
