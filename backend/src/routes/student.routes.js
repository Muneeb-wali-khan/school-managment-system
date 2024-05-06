import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import {isStudent, jwtVerify } from "../middlewares/auth.middleware.js";
import { allStudentsNotifications, getAssigmentsOfStudentClass, getLogedInStudentAttendanceRecord, getLogedInStudentDetails, singleStudentNotifications } from "../controllers/student.controller.js";
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";
const router = Router();




// --student 
router.route("/student-profile").get(jwtVerify,isStudent, getLogedInStudentDetails)
router.route("/student-attendance-record").get(jwtVerify,isStudent, getLogedInStudentAttendanceRecord)
router.route("/student-class-assigments").get(jwtVerify,isStudent, getAssigmentsOfStudentClass)
router.route("/student-class-notifications").get(jwtVerify,isStudent, allStudentsNotifications)
router.route("/single-student-notifications").get(jwtVerify,isStudent, singleStudentNotifications)




// Error handling middleware for MulterError o file exceeded
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        // Customize the error message for file size limit
        throw new ApiError(500, "File/image size must be 300 KB or less");
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