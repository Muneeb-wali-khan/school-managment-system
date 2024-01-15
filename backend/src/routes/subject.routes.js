import { Router } from "express";
import {
  BothTeacherAdmin,
  isAdmin,
  jwtVerify,
} from "../middlewares/auth.middleware.js";
import {
  addSubject,
  allSubjects,
  removeSubject,
  singleSubject,
} from "../controllers/subject.controllers.js";
const router = Router();



router.route("/all-subjects").get(jwtVerify, allSubjects);
router.route("/add-subject").post(jwtVerify, addSubject);
router.route("/single-subject/:id").get(jwtVerify, singleSubject);
router.route("/remove-subject/:id").delete(jwtVerify, removeSubject);



export default router;
