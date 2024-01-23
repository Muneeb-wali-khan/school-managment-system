import { Router } from "express";
import { ApiError } from "../utils/ApiError.js";
import multer from "multer";
import { upload } from "../middlewares/multer.js";
import { isAdmin, isTeacher, jwtVerify } from "../middlewares/auth.middleware.js";
import { addStudentsToClass, addTeacher, allStudentsOfSpecificClass, allTeachersOfSpecificClass, deleteTeacher, getAllTeachers, getLogedInTeacherDetails, getStudentDetail, getTeacherById, updateStudentsOfClass, updateTeacher } from "../controllers/teacher.controller.js";
const router = Router();


// --admin 
router.route("/all-teachers").get(jwtVerify, getAllTeachers)
router.route("/single-teacher/:id").get(jwtVerify, getTeacherById)
router.route("/add-teacher").post(jwtVerify, upload.single("avatar"), addTeacher)
router.route("/update-teacher/:id").put(jwtVerify, updateTeacher)
router.route("/remove-teacher/:id").delete(jwtVerify, deleteTeacher)


// -- teacher
router.route("/teacher-profile").get(jwtVerify,isTeacher, getLogedInTeacherDetails)
router.route("/all-students-class").get(jwtVerify,isTeacher, allStudentsOfSpecificClass)
router.route("/single-student-detail/:id").get(jwtVerify,isTeacher, getStudentDetail)
router.route("/class-teacher-add-student").post(jwtVerify,isTeacher,upload.single("avatar"), addStudentsToClass)
router.route("/class-teacher-update-student").put(jwtVerify,isTeacher,upload.single("avatar"), updateStudentsOfClass)

router.route("/all-teachers-class").get(jwtVerify,isTeacher, allTeachersOfSpecificClass)




// Error handling middleware for MulterError o file exceeded
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      // Customize the error message for file size limit
      throw new ApiError(500, "File/image size must be 200 KB or less");
    }
  }
  if(err instanceof multer.MulterError){
    if(err.code === "LIMIT_UNEXPECTED_FILE"){
      throw new ApiError(500, "Only image is allowed !")
    }
  }
  console.log(err);
  next(err);
});



export default router;