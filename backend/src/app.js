import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
const app = express();


app.use(
  cors({
    origin: "https://remarkable-scone-6f13ec.netlify.app",
    credentials: true
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
import adminRouter from "./routes/admin.routes.js"



// use routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/teacher", teacherRouter)
app.use("/api/v1/student", studentRouter)
app.use("/api/v1/subject", studentSubject)
app.use("/api/v1/class", classRouter)
app.use("/api/v1/admin", adminRouter)


// middleware to show error response in json send to client
// comment it when developing backend to trace error

app.use((error,req,res,next)=>{
  error.statusCode = error.statusCode || 500;
  error.statusCode = error.statusCode || "error";
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
  })

})


export  { app };
