import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { addTeacher, deleteTeacher, getAllTeachers, updateTeacher } from "../controllers/teacher.controller.js";
const router = Router();



router.route("/all-teachers").get(jwtVerify, getAllTeachers)
router.route("/add-teacher").post(jwtVerify, upload.single("avatar"), addTeacher)
router.route("/update-teacher/:id").put(jwtVerify, updateTeacher)
router.route("/remove-teacher/:id").delete(jwtVerify, deleteTeacher)



export default router;