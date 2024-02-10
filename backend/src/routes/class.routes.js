import { Router } from "express";
import { isAdmin, jwtVerify } from "../middlewares/auth.middleware.js";
import {
  allClasses,
} from "../controllers/class.controllers.js";
const router = Router();



router.route("/all-classes").get(jwtVerify,isAdmin, allClasses);



export default router;
