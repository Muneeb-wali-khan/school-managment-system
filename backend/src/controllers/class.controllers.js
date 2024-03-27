import { Class } from "../models/class.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


//  all-classes
const allClasses = asyncHandler(async (req, res) => {
  const findclass = await Class.find({}).select("-students -teachersOfClass -subjects")
  .populate({
    path: "classTeacherID",
    select: "fullName email",
  });

  if (!findclass) {
    throw new ApiError(400, "No Classes found !");
  }

  return res.status(200).json(new ApiResponse(200, findclass, "class"));
});

export { allClasses };
