import { Router } from "express";
import {
  BothTeacherAdmin,
  isAdmin,
  jwtVerify,
} from "../middlewares/auth.middleware.js";
import {
  addCurriculumSubject,
  addSubject,
  allCurriculumSubject,
  allSubjects,
  deleteCurriculumSubject,
  removeSubject,
  singleSubject,
  updateCurriculumSubject,
} from "../controllers/subject.controllers.js";
const router = Router();



router.route("/all-subjects").get(jwtVerify, allSubjects);
router.route("/add-subject").post(jwtVerify, addSubject);
router.route("/single-subject/:id").get(jwtVerify, singleSubject);
router.route("/remove-subject/:id").delete(jwtVerify, removeSubject);

router.route("/all-curriculums-subject/:id").get(jwtVerify, allCurriculumSubject);
router.route("/add-curriculum/:id").post(jwtVerify, addCurriculumSubject);
router.route("/update-curriculum/:id").put(jwtVerify, updateCurriculumSubject);
router.route("/remove-curriculum/:id").delete(jwtVerify, deleteCurriculumSubject);



export default router;
