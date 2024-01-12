import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { BothTeacherAdmin, isAdmin, jwtVerify } from "../middlewares/auth.middleware.js";
import { addAcademicRecordStudent, addStudent, getAllStudent, getStudentById, updateStudent, updatedStudentAcedamicRecord } from "../controllers/student.controller.js";
const router = Router();



// --admin 
router.route("/update-student/:id").put(jwtVerify,BothTeacherAdmin, updateStudent)
router.route("/student/:id").get(jwtVerify, getStudentById)

router.route("/add-student-academic-record/:id").post(jwtVerify,BothTeacherAdmin, addAcademicRecordStudent)
router.route("/update-student-academic-record/:id").post(jwtVerify,BothTeacherAdmin, updatedStudentAcedamicRecord)


// --admin 
router.route("/all-students").get(jwtVerify,isAdmin, getAllStudent)
router.route("/add-student").post(jwtVerify,BothTeacherAdmin, upload.single("avatar"), addStudent)

export default router;