import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { isAdmin, jwtVerify } from "../middlewares/auth.middleware.js";
import {  getAllStudent } from "../controllers/student.controller.js";
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";
const router = Router();




// --student 
router.route("/all-students").get(jwtVerify,isAdmin, getAllStudent)




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