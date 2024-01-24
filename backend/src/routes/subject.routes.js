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



router.route("/all-subjects").get(jwtVerify,isAdmin, allSubjects);
router.route("/add-subject").post(jwtVerify,isAdmin, addSubject);
router.route("/single-subject/:id").get(jwtVerify,isAdmin, singleSubject);
router.route("/remove-subject/:id").delete(jwtVerify,isAdmin, removeSubject);

router.route("/all-curriculums-subject/:id").get(jwtVerify,isAdmin, allCurriculumSubject);
router.route("/add-curriculum/:id").post(jwtVerify,isAdmin, addCurriculumSubject);
router.route("/update-curriculum/:id").put(jwtVerify,isAdmin, updateCurriculumSubject);
router.route("/remove-curriculum/:id").delete(jwtVerify,isAdmin, deleteCurriculumSubject);



export default router;
