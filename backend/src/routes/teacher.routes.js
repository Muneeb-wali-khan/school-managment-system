import { Router } from "express";
import { ApiError } from "../utils/ApiError.js";
import multer from "multer";
import { upload } from "../middlewares/multer.js";
import { isAdmin, jwtVerify } from "../middlewares/auth.middleware.js";
import { addTeacher, deleteTeacher, getAllTeachers, getTeacherById, updateTeacher } from "../controllers/teacher.controller.js";
const router = Router();


// --admin 
router.route("/all-teachers").get(jwtVerify, getAllTeachers)
router.route("/single-teacher/:id").get(jwtVerify, getTeacherById)
router.route("/add-teacher").post(jwtVerify, upload.single("avatar"), addTeacher)
router.route("/update-teacher/:id").put(jwtVerify, updateTeacher)
router.route("/remove-teacher/:id").delete(jwtVerify, deleteTeacher)


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