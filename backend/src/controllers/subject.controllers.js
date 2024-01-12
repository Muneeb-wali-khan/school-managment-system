import { Subject } from "../models/subject.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Teacher } from "../models/teacher.model.js";

// add subjects
const addSubject = asyncHandler(async (req, res) => {
  // remeber teachers and classes is not required
  // it will
  const { subjectName, teachers, classes } = req.body;

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
  });

  return res
    .status(201)
    .json(new ApiResponse(201, subject, `${upper} Subject added successfully`));
});





// assign teachers to subjet
const assignTeachersOfSubject = asyncHandler(async (req, res, next) => {
  const { subjectName } = req.body;

  if(!subjectName){
      throw new ApiError(400, "subject name is required !")
  }

  const upper =
    subjectName[0].toUpperCase() +
    subjectName.substring(1, subjectName?.length);

  const findTeacherBySubjectName = (await Teacher.find({ subject: upper })).map(
    (getid) => {
      return getid?._id;
    }
  );


  if (!findTeacherBySubjectName) {
    throw new ApiError(400, `teachers not found for ${upper} subject !`);
  }

  const findSubject = await Subject.findOne({ subjectName: upper });

  if (!findSubject) {
    throw new ApiError(400, "subject not found !");
  }

  const addTeacherToSubjectTeachersArray = await findSubject?.teachers.push(
   ...findTeacherBySubjectName
  );
  
  if (findSubject.teachers.length === 0) {
    throw new ApiError(400, "teachers addition failed !");
  }
  

  await findSubject.save({ validateBeforeSave: false });

  return res.status(200).json(
     new ApiResponse(200, {}, `teachers added successfully for subject ${upper} !`)
  )


});

export { addSubject, assignTeachersOfSubject };
