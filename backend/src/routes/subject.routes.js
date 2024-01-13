import { Router } from "express";
import { BothTeacherAdmin, isAdmin, jwtVerify } from "../middlewares/auth.middleware.js";
import { addSubject } from "../controllers/subject.controllers.js";
const router = Router();


router.route("/add-subject").post(jwtVerify, addSubject)




export default router;