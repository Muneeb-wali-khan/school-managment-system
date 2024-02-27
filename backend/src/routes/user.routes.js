import { Router } from "express";
import {
  changePassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAvatar,
  updateProfile
  
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

const router = Router();


router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);

// protected routes
router.route("/logout").post(jwtVerify, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/user/me").get(jwtVerify, getCurrentUser);
router.route("/user/change-password").put(jwtVerify, changePassword);
router.route("/user/update-profile").put(jwtVerify, updateProfile);
router.route("/user/update-avatar").put(jwtVerify, upload.single("avatar"), updateAvatar);





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
