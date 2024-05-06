import { Student } from "../models/student.model.js";
import { Attendance } from "../models/attendance.mode.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Assignment } from "../models/assigments.model.js";
import { TeacherNotify } from "../models/notificationSt.model.js";

// get loged in student details / by its fullName and email
const getLogedInStudentDetails = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const st = await Student.findOne({
    email: email,
    fullName: fullName,
  })
    .select("-academicHistory")
    .populate({
      path: "className",
      select: "className",
    });

  if (!st) {
    throw new ApiError(
      400,
      "You'r not yet added as a student  contact class Teacher !"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, st, "loged in Student details"));
});

// get loged in student attendance record per month
const getLogedInStudentAttendanceRecord = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const st = await Student.findOne({
    email: email,
    fullName: fullName,
  });

  if (!st) {
    throw new ApiError(
      400,
      "You'r not yet added as a student contact class Teacher !"
    );
  }

  const attendance = await Attendance.find({ studentID: st?._id });

  if (!attendance) {
    throw new ApiError(
      400,
      "attendance record not found contact class Teacher !"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, attendance, "loged in Student attendance details")
    );
});

// get assigments of student class
const getAssigmentsOfStudentClass = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const st = await Student.findOne({
    email: email,
    fullName: fullName,
  }).populate({
    path: "className",
    select: "className",
  });

  if (!st) {
    throw new ApiError(
      400,
      "You'r not yet added as a student contact class Teacher !"
    );
  }
  const assigments = await Assignment.find({ forClass: st?.className?.className });

  if (!assigments) {
    throw new ApiError(
      400,
      "assigments record not found contact class Teacher !"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, assigments, "loged in Student assigments details")
    );
});


// get for all students notifications from teacher
const allStudentsNotifications = asyncHandler(async (req, res) => {
  const getNotifications = await TeacherNotify.find()

  if(!getNotifications){
    throw new ApiError(404, "No notifications found !")
  }

  // filter those which dont have specific email and name means not personal notification
  const filterwithoutEmailandFullNameNotifications = getNotifications?.filter(val=> !val?.studentFullName && !val?.studentEmail)

  return res.status(200).json(new ApiResponse(200, filterwithoutEmailandFullNameNotifications, "All notifications fetched"));
})

// get personal student notifications
const singleStudentNotifications = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const st = await Student.findOne({
    email: email,
    fullName: fullName,
  });

  if (!st) {
    throw new ApiError(
      400,
      "You'r not yet added as a student contact class Teacher !"
    );
  }

  const getNotifications = await TeacherNotify.find({
    studentFullName: fullName,
    studentEmail: email
  })

  if(!getNotifications){
    throw new ApiError(404, "No notifications found !")
  }

  return res.status(200).json(new ApiResponse(200, getNotifications, "All notifications fetched"));
  
})




export {
  getLogedInStudentDetails,
  getLogedInStudentAttendanceRecord,
  getAssigmentsOfStudentClass,
  allStudentsNotifications,
  singleStudentNotifications
};
