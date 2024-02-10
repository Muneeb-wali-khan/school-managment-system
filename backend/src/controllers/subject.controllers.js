import { Subject } from "../models/subject.model.js";
import { Class } from "../models/class.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



// all subjects
const allSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find();

  return res
    .status(200)
    .json(new ApiResponse(200, subjects, "subjects fetched"));
});



export {
  allSubjects,
};
