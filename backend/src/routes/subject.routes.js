import { Router } from "express";
import { BothTeacherAdmin, isAdmin, jwtVerify } from "../middlewares/auth.middleware.js";
import { addSubject, assignTeachersOfSubject } from "../controllers/subject.controllers.js";
const router = Router();


router.route("/add-subject").post(jwtVerify, addSubject)
router.route("/assign-subject-teachers").put(jwtVerify, assignTeachersOfSubject)




export default router;