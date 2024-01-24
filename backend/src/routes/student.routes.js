import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { isAdmin, jwtVerify } from "../middlewares/auth.middleware.js";
import { addAcademicRecordStudent, addStudent, deleteAcademicRecord, deleteStudent, getAllStudent, getStudentById, updateStudent, updatedStudentAcedamicRecord } from "../controllers/student.controller.js";
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";
const router = Router();




// --admin 
router.route("/all-students").get(jwtVerify,isAdmin, getAllStudent)
router.route("/student/:id").get(jwtVerify,isAdmin, getStudentById)
router.route("/add-student").post(jwtVerify,isAdmin, upload.single("avatar"), addStudent)
router.route("/update-student/:id").put(jwtVerify,isAdmin, updateStudent)
router.route("/remove-student/:id").delete(jwtVerify,isAdmin, deleteStudent)

// academic record of student
router.route("/all-student-academic-record/:id").get(jwtVerify,isAdmin, addAcademicRecordStudent)
router.route("/add-student-academic-record/:id").post(jwtVerify,isAdmin, addAcademicRecordStudent)
router.route("/update-student-academic-record/:id").post(jwtVerify,isAdmin, updatedStudentAcedamicRecord)
router.route("/remove-student-academic-record/:id").delete(jwtVerify,isAdmin, deleteAcademicRecord)




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
    next(err);
  });
  
  

export default router;