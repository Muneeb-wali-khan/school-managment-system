import { Student } from "../models/student.model.js";
import { Class } from "../models/class.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinaryUploadImg } from "../utils/cloudinary.js";

// all students --admin
const getAllStudent = asyncHandler(async (req, res, next) => {
  const students = await Student.find();

  return res
    .status(200)
    .json(new ApiResponse(200, students, "Students fetched successfully"));
});


export {
  getAllStudent
};
