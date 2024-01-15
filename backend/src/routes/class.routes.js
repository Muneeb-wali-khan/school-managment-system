import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import {
  addClass,
  allClasses,
  deleteClass,
  singleClass,
  updateClass,
} from "../controllers/class.controllers.js";
const router = Router();



router.route("/add-class").post(jwtVerify, addClass);
router.route("/all-classes").get(jwtVerify, allClasses);
router.route("/single-class/:id").get(jwtVerify, singleClass);
router.route("/update-class/:id").put(jwtVerify, updateClass);
router.route("/remove-class/:id").delete(jwtVerify, deleteClass);



export default router;
