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
    throw new ApiError(400, `${subjectName} subject already exists`);
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
  if (!findClassesforSubject) {
    return new ApiError(400, "No classes found for this subject");
  }
  for (const sub of findClassesforSubject) {
    sub.subjects = sub?.subjects?.filter(
      (id) => id.toString() !== req.params?.id.toString()
    );
    await sub.save();
  }
  const subject = await Subject.findByIdAndDelete(req.params?.id);

  return res.status(200).json(new ApiResponse(200, {}, "subject removed"));
});



// all curriculum of a subject
const allCurriculumSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params?.id);
  if (!subject) {
    throw new ApiError(404, "subject not found !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, subject?.curriculum, "curriculum fetched"));
});



// add curriculum of a subject
const addCurriculumSubject = asyncHandler(async (req, res) => {
  const { year, description, documentationLink, keyTopics } = req.body;

  const subject = await Subject.findById(req.params?.id);
  if (!subject) {
    throw new ApiError(404, "subject not found !");
  }
  for (const curiculum of subject?.curriculum) {
    if (year && year === curiculum?.year) {
      throw new ApiError(404, `curriculum of year ${year} already exists !`);
    }
  }

  const pushCurriculum = subject?.curriculum?.push({
    year,
    description,
    documentationLink,
    keyTopics,
  });
  await subject.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(200, subject, `${year} Curriculum added successfully`)
    );
});



//update curriculum of a subject
const updateCurriculumSubject = asyncHandler(async (req, res) => {
  const { curriculumId, year, description, documentationLink, keyTopics } =
    req.body;

  const findSubject = await Subject.findById(req.params?.id);
  if (!findSubject) {
    throw new ApiError(404, "Subject not found!");
  }

  const record = findSubject?.curriculum.find(
    (r) => r._id.toString() === curriculumId
  );

  const existingRecord = findSubject?.curriculum.find(
    (curriculum) =>
      curriculum.year === year && curriculum._id.toString() !== curriculumId
  );

  if (existingRecord) {
    throw new ApiError(404, `Curriculum of year ${year} already exists!`);
  }

  if (!record) {
    throw new ApiError(404, "Curriculum record not found!");
  }
  const updatedRecord = (record.year = year || record.year);
  record.description = description || record.description;
  record.documentationLink = documentationLink || record.documentationLink;
  record.keyTopics = keyTopics || record.keyTopics;
  console.log("curi done");

  if (!updatedRecord) {
    throw new ApiError(404, "Curriculum not updated");
  }

  const save = await findSubject.save();

  if (save) {
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          updatedRecord,
          `${year} Curriculum updated successfuly`
        )
      );
  }
});



// delete curriculum of a subject
const deleteCurriculumSubject = asyncHandler(async (req, res) => {
  const { curriculumId } = req.body;

  const findSubject = await Subject.findById(req.params?.id);
  if (!findSubject) {
    throw new ApiError(404, "Subject not found!");
  }

  const record = findSubject?.curriculum.find(
    (r) => r._id.toString() === curriculumId
  );

  if (!record) {
    throw new ApiError(404, "Curriculum record not found!");
  }
  const deleteRecord = findSubject.curriculum = findSubject?.curriculum.filter(
    (r) => r._id.toString() !== curriculumId
  );

  if (!deleteRecord) {
    throw new ApiError(404, "Curriculum not updated");
  }

  const save = await findSubject.save();

  if (save) {
    return res
      .status(201)
      .json(new ApiResponse(201, deleteRecord, `${record?.year} Curriculum record deleted successfuly`));
  }
});



export {
  addSubject,
  allSubjects,
  singleSubject,
  removeSubject,
  allCurriculumSubject,
  addCurriculumSubject,
  updateCurriculumSubject,
  deleteCurriculumSubject,
};
