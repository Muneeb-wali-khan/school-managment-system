import { Router } from "express";
import { isAdmin, jwtVerify } from "../middlewares/auth.middleware.js";
import {
  addClass,
  allClasses,
  deleteClass,
  singleClass,
  updateClass,
} from "../controllers/class.controllers.js";
const router = Router();



router.route("/add-class").post(jwtVerify,isAdmin, addClass);
router.route("/all-classes").get(jwtVerify,isAdmin, allClasses);
router.route("/single-class/:id").get(jwtVerify,isAdmin, singleClass);
router.route("/update-class/:id").put(jwtVerify,isAdmin, updateClass);
router.route("/remove-class/:id").delete(jwtVerify,isAdmin, deleteClass);



export default router;
