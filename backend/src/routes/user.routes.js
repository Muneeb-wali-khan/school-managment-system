import { Router } from "express";
import {
  changePassword,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAvatar,
  updateProfile,
  updateUserRole,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";
import { isAdmin, jwtVerify } from "../middlewares/auth.middleware.js";

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



//--admin
router.route("/all-users").get(jwtVerify,isAdmin, getAllUsers);
router.route("/update-user-role/:id").put(jwtVerify,isAdmin, updateUserRole);
router.route("/remove-user/:id").delete(jwtVerify,isAdmin, deleteUser);







export default router;
