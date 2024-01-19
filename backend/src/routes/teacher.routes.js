import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { addTeacher, deleteTeacher, getAllTeachers, getTeacherById, updateTeacher } from "../controllers/teacher.controller.js";
const router = Router();


// --admin 
router.route("/all-teachers").get(jwtVerify, getAllTeachers)
router.route("/single-teacher/:id").get(jwtVerify, getTeacherById)
router.route("/add-teacher").post(jwtVerify, upload.single("avatar"), addTeacher)
router.route("/update-teacher/:id").put(jwtVerify, updateTeacher)
router.route("/remove-teacher/:id").delete(jwtVerify, deleteTeacher)



export default router;