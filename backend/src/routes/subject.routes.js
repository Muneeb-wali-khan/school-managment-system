import { Router } from "express";
import {
  BothTeacherAdmin,
  isAdmin,
  jwtVerify,
} from "../middlewares/auth.middleware.js";
import {
  allSubjects,
} from "../controllers/subject.controllers.js";
const router = Router();



router.route("/all-subjects").get(jwtVerify,isAdmin, allSubjects);




export default router;
