import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { addTeacher } from "../controllers/teacher.controller.js";
const router = Router();



router.route("/add-teacher").post(jwtVerify, upload.single("avatar"), addTeacher)



export default router;