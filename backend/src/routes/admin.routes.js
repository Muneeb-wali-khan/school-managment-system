import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { isAdmin, jwtVerify } from "../middlewares/auth.middleware.js";

import { 
  addTeacher,
  deleteTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  
  addStudent,
  deleteStudent,
  getAllStudent,
  getStudentById,
  updateStudent,
  addAcademicRecordStudent,
  updatedStudentAcedamicRecord,
  deleteAcademicRecord,

  addClass,
  allClasses,
  deleteClass,
  singleClass,
  updateClass,

  addCurriculumSubject,
  addSubject,
  allCurriculumSubject,
  allSubjects,
  deleteCurriculumSubject,
  removeSubject,
  singleSubject,
  updateCurriculumSubject,

} from "../controllers/admin.controllers.js";
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";
const router = Router();




// -- STUDENTS ROUTES 
router.route("/all-students").get(jwtVerify,isAdmin, getAllStudent)
router.route("/student/:id").get(jwtVerify,isAdmin, getStudentById)
router.route("/add-student").post(jwtVerify,isAdmin, upload.single("avatar"), addStudent)
router.route("/update-student/:id").put(jwtVerify,isAdmin, updateStudent)
router.route("/remove-student/:id").delete(jwtVerify,isAdmin, deleteStudent)
// academic record of students
router.route("/all-student-academic-record/:id").get(jwtVerify,isAdmin, addAcademicRecordStudent)
router.route("/add-student-academic-record/:id").post(jwtVerify,isAdmin, addAcademicRecordStudent)
router.route("/update-student-academic-record/:id").post(jwtVerify,isAdmin, updatedStudentAcedamicRecord)
router.route("/remove-student-academic-record/:id").delete(jwtVerify,isAdmin, deleteAcademicRecord)



// -- TEACHERS ROUTES
router.route("/all-teachers").get(jwtVerify,isAdmin, getAllTeachers)
router.route("/single-teacher/:id").get(jwtVerify,isAdmin, getTeacherById)
router.route("/add-teacher").post(jwtVerify,isAdmin, upload.single("avatar"), addTeacher)
router.route("/update-teacher/:id").put(jwtVerify,isAdmin, updateTeacher)
router.route("/remove-teacher/:id").delete(jwtVerify,isAdmin, deleteTeacher)



// -- CLASS ROUTES
router.route("/add-class").post(jwtVerify,isAdmin, addClass);
router.route("/all-classes").get(jwtVerify,isAdmin, allClasses);
router.route("/single-class/:id").get(jwtVerify,isAdmin, singleClass);
router.route("/update-class/:id").put(jwtVerify,isAdmin, updateClass);
router.route("/remove-class/:id").delete(jwtVerify,isAdmin, deleteClass);



// -- SUBJECTS ROUTES
router.route("/all-subjects").get(jwtVerify,isAdmin, allSubjects);
router.route("/add-subject").post(jwtVerify,isAdmin, addSubject);
router.route("/single-subject/:id").get(jwtVerify,isAdmin, singleSubject);
router.route("/remove-subject/:id").delete(jwtVerify,isAdmin, removeSubject);

router.route("/all-curriculums-subject/:id").get(jwtVerify,isAdmin, allCurriculumSubject);
router.route("/add-curriculum/:id").post(jwtVerify,isAdmin, addCurriculumSubject);
router.route("/update-curriculum/:id").put(jwtVerify,isAdmin, updateCurriculumSubject);
router.route("/remove-curriculum/:id").delete(jwtVerify,isAdmin, deleteCurriculumSubject);


// Error handling middleware for MulterError o file exceeded
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      // Customize the error message for file size limit
      throw new ApiError(500, "File/image size must be 200 KB or less");
    }
  }
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      throw new ApiError(500, "Only image is allowed !");
    }
  }
  next(err);
});

export default router;
