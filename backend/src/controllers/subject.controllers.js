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

// get single subject
const singleSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params?.id)
    .populate({
      path: "teachers",
      select: "fullName",
    })
    .populate({
      path: "classes",
      select: "className",
    });

  return res.status(200).json(new ApiResponse(200, subject, "subject fetched"));
});

// add subjects
const addSubject = asyncHandler(async (req, res) => {
  // remeber teachers and classes is not required
  // it will
  const { subjectName, teachers, classes, curriculum } = req.body;

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
    curriculum,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, subject, `${upper} Subject added successfully`));
});

// remove subject
const removeSubject = asyncHandler(async (req, res) => {

  const findClassesforSubject = await Class.find({
    subjects: req.params?.id,
  });
  if(!findClassesforSubject){
    return new ApiError(400, "No classes found for this subject");
  }
  for(const sub of findClassesforSubject){
    sub.subjects = sub?.subjects?.filter((id) => id.toString() !== req.params?.id.toString());
    await sub.save();
  }
  const subject = await Subject.findByIdAndDelete(req.params?.id);

  return res.status(200).json(new ApiResponse(200, {}, "subject removed"));

})

export { addSubject , allSubjects, singleSubject, removeSubject};
