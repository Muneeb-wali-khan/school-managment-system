import { Subject } from "../models/subject.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Teacher } from "../models/teacher.model.js";

// add subjects
const addSubject = asyncHandler(async (req, res) => {
  // remeber teachers and classes is not required
  // it will
  const { subjectName, teachers, classes,curriculum } = req.body;

  const upper =
    subjectName[0].toUpperCase() +
    subjectName.substring(1, subjectName?.length);

  const subjects = await Subject.findOne({ subjectName: upper });

  if (subjects) {
    return new ApiError(400, `${subjectName} subject already exists`);
  }

  const subject = await Subject.create({
    subjectName: upper,
    teachers,
    classes,
    curriculum
  });

  return res
    .status(201)
    .json(new ApiResponse(201, subject, `${upper} Subject added successfully`));
});






export { addSubject };
