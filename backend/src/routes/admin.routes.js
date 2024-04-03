import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { isAdmin, jwtVerify } from "../middlewares/auth.middleware.js";

import { 
  getAllUsers,
  singleUser,
  deleteUser,
  updateUserRole,
  updateUserAvatar,

  addTeacher,
  deleteTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  updateTeacherAvatar,
  getAllAttendacesOfClass,
  sendNotification,
  
  addStudent,
  deleteStudent,
  getAllStudent,
  getStudentById,
  updateStudent,
  updateAvatarStudent,
  allAcademicRecordStudent,
  singleAcademicRecord,
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
  singleCurriculumRecord,

} from "../controllers/admin.controllers.js";
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";
const router = Router();


// USER ROUTES
router.route("/all-users").get(jwtVerify,isAdmin, getAllUsers);
router.route("/single-user/:id").get(jwtVerify,isAdmin, singleUser);
router.route("/update-user-role/:id").put(jwtVerify,isAdmin, updateUserRole);
router.route("/update-user-avatar/:id").put(jwtVerify,isAdmin,upload.single("avatar"), updateUserAvatar);
router.route("/remove-user/:id").delete(jwtVerify,isAdmin, deleteUser);




// -- STUDENTS ROUTES 
router.route("/all-students").get(jwtVerify,isAdmin, getAllStudent)
router.route("/student/:id").get(jwtVerify,isAdmin, getStudentById)
router.route("/add-student").post(jwtVerify,isAdmin, upload.single("avatar"), addStudent)
router.route("/update-student/:id").put(jwtVerify,isAdmin, updateStudent)
router.route("/update-student-avatar/:id").put(jwtVerify,isAdmin,upload.single("avatar"),updateAvatarStudent)
router.route("/remove-student/:id").delete(jwtVerify,isAdmin, deleteStudent)

// academic record of students
router.route("/all-student-academic-record/:id").get(jwtVerify,isAdmin, allAcademicRecordStudent)
router.route("/single-student-academic-record/:id").get(jwtVerify,isAdmin, singleAcademicRecord)
router.route("/add-student-academic-record/:id").post(jwtVerify,isAdmin, addAcademicRecordStudent)
router.route("/update-student-academic-record/:id").post(jwtVerify,isAdmin, updatedStudentAcedamicRecord)
router.route("/remove-student-academic-record/:id").delete(jwtVerify,isAdmin, deleteAcademicRecord)



// -- TEACHERS ROUTES
router.route("/all-teachers").get(jwtVerify,isAdmin, getAllTeachers)
router.route("/single-teacher/:id").get(jwtVerify,isAdmin, getTeacherById)
router.route("/add-teacher").post(jwtVerify,isAdmin, upload.single("avatar"), addTeacher)
router.route("/update-teacher/:id").put(jwtVerify,isAdmin, updateTeacher)
router.route("/update-avatar-teacher/:id").put(jwtVerify,isAdmin,upload.single("avatar"), updateTeacherAvatar)
router.route("/remove-teacher/:id").delete(jwtVerify,isAdmin, deleteTeacher)
router.route("/all-attendances-class/:className").get(jwtVerify,isAdmin, getAllAttendacesOfClass)
router.route("/notify-teachers").post(jwtVerify,isAdmin, sendNotification)



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
router.route("/single-curriculum/:id").get(jwtVerify,isAdmin, singleCurriculumRecord);
router.route("/update-curriculum/:id").put(jwtVerify,isAdmin, updateCurriculumSubject);
router.route("/remove-curriculum/:id").delete(jwtVerify,isAdmin, deleteCurriculumSubject);


// Error handling middleware for MulterError o file exceeded
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      // Customize the error message for file size limit
      throw new ApiError(500, "File/image size must be 300 KB or less");
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
