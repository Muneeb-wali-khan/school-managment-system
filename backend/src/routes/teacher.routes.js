import { Router } from "express";
import { ApiError } from "../utils/ApiError.js";
import multer from "multer";
import { upload } from "../middlewares/multer.js";
import {  isTeacher, jwtVerify } from "../middlewares/auth.middleware.js";
import { addStudentsToClass, allAssignmentsOfClass, allStudentsOfSpecificClass, allSubjectsOfClass, allTeachersNotifications, allTeachersOfSpecificClass, curriculumOfSubjectOfClass, deleteAssigment, deleteNotification, deleteStudentFromClass, getAllNotifications, getAttendanceOfMonthly, getAttendanceOfToday, getLogedInTeacherDetails, getNotificationById, getSingleAssignment, getStudentDetail,  giveAssignments,  notifyAbsenties,  notifySingleStudent,  sendNotificationStudents,  singleTeacherNotifications,  takeAttendance, updateAssigment, updateNotification, updateStudentAvatar, updateStudentsOfClass } from "../controllers/teacher.controller.js";
const router = Router();



// -- teacher
router.route("/teacher-profile").get(jwtVerify,isTeacher, getLogedInTeacherDetails)
router.route("/all-students-class").get(jwtVerify,isTeacher, allStudentsOfSpecificClass)
router.route("/single-student-detail/:id").get(jwtVerify,isTeacher, getStudentDetail)
router.route("/class-teacher-add-student").post(jwtVerify,isTeacher,upload.single("avatar"), addStudentsToClass)
router.route("/update-student-class/:id").put(jwtVerify,isTeacher, updateStudentsOfClass)
router.route("/update-student-avatar/:id").put(jwtVerify,isTeacher,upload.single("avatar"), updateStudentAvatar)
router.route("/remove-student-class/:id").delete(jwtVerify,isTeacher, deleteStudentFromClass)
router.route("/take-attendance-class").post(jwtVerify,isTeacher, takeAttendance)
router.route("/monthly-attendance-student/:id").get(jwtVerify,isTeacher, getAttendanceOfMonthly)
router.route("/attendance-class-today").get(jwtVerify,isTeacher, getAttendanceOfToday)
router.route("/notify-students-absent").post(jwtVerify,isTeacher, notifyAbsenties)
router.route("/give-assigment-class").post(jwtVerify,isTeacher, giveAssignments)
router.route("/all-assigments-class").get(jwtVerify,isTeacher, allAssignmentsOfClass)
router.route("/single-assigment-class").get(jwtVerify,isTeacher, getSingleAssignment)
router.route("/update-assigment-class").put(jwtVerify,isTeacher, updateAssigment)
router.route("/delete-assigment-class").delete(jwtVerify,isTeacher, deleteAssigment)
router.route("/all-notifications-for-teachers").get(jwtVerify,isTeacher, allTeachersNotifications)
router.route("/single-teacher-notifications").get(jwtVerify,isTeacher, singleTeacherNotifications)
router.route("/notify-students-class").post(jwtVerify,isTeacher, sendNotificationStudents)
router.route("/notify-single-student-class").post(jwtVerify,isTeacher, notifySingleStudent)
router.route("/all-notifications-class").get(jwtVerify,isTeacher, getAllNotifications)
router.route("/single-notification-class/:id").get(jwtVerify,isTeacher, getNotificationById)
router.route("/update-notification-class/:id").put(jwtVerify,isTeacher, updateNotification)
router.route("/delete-notification-class/:id").delete(jwtVerify,isTeacher, deleteNotification)


router.route("/all-teachers-class").get(jwtVerify,isTeacher, allTeachersOfSpecificClass)

router.route("/all-subjects-class").get(jwtVerify,isTeacher, allSubjectsOfClass)
router.route("/curriculum-subject").get(jwtVerify,isTeacher, curriculumOfSubjectOfClass)





// Error handling middleware for MulterError o file exceeded
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      // Customize the error message for file size limit
      throw new ApiError(500, "File/image size must be 300 KB or less");
    }
  }
  if(err instanceof multer.MulterError){
    if(err.code === "LIMIT_UNEXPECTED_FILE"){
      throw new ApiError(500, "Only image is allowed !")
    }
  }
  console.log(err);
  next(err);
});



export default router;