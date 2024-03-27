import { Student } from "../models/student.model.js";
import { Class } from "../models/class.model.js";
import { Attendance } from "../models/attendance.mode.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinaryUploadImg } from "../utils/cloudinary.js";

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
  })

  
  if (!st) {
    throw new ApiError(
      400,
      "You'r not yet added as a student contact class Teacher !"
    );
  }

  const attendance = await Attendance.find({studentID:st?._id})

  if (!attendance) {
    throw new ApiError(
      400,
      "attendance record not found contact class Teacher !"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, attendance, "loged in Student attendance details"));

})

export { getLogedInStudentDetails,getLogedInStudentAttendanceRecord };
