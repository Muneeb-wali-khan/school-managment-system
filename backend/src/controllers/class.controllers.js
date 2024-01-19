import { Class } from "../models/class.model.js";
import { Student } from "../models/student.model.js";
import { Teacher } from "../models/teacher.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subject } from "../models/subject.model.js";
import { changeToUpperCase } from "../utils/toUpperCase.js";

//  all-classes
const allClasses = asyncHandler(async (req, res) => {
  const findclass = await Class.find({}).populate("students");

  if (!findclass) {
    throw new ApiError(400, "No Classes found !");
  }

  return res.status(200).json(new ApiResponse(200, findclass, "class"));
});

// add-classes --admin
const addClass = asyncHandler(async (req, res) => {
  const { className, email, fullName, subjects } = req.body;

  const spl = subjects?.split(",");

  if (spl?.length < 3) {
    if (!subjects?.match(",")) {
      throw new ApiError(
        400,
        "subjects must ends with trailing commas ex: subject1, subject2 !"
      );
    }
  }

  if ([className, email, fullName].some((fields) => fields?.trim() === "")) {
    throw new ApiError(400, "all feilds are required !");
  }
  const findteacher = await Teacher.findOne({ $or: [{ email }, { fullName }] });
  if (!findteacher) {
    throw new ApiError(400, "teacher with email/fullName not found");
  }

  const classExist = await Class.findOne({
    className: className?.toUpperCase(),
  });
  const teacherExist = await Class.findOne({
    classTeacherID: findteacher?._id,
  });

  if (teacherExist) {
    throw new ApiError(400, "Class teacher already assigned to another class");
  }

  const firstlattertoUpperCaseSubjects = spl?.map((sub) =>
    changeToUpperCase(sub)
  );
  const findSubjects = await Subject.find({
    subjectName: { $in: firstlattertoUpperCaseSubjects },
  });

  // map over find subjects
  const existingSubjects = findSubjects?.map((sub) => sub?.subjectName);
  // check if user provides subjects/subject are present in existingSubjects
  const nonExistingSubjects = firstlattertoUpperCaseSubjects.filter(
    (sub) => !existingSubjects.includes(sub)
  );

  if (nonExistingSubjects.length > 0) {
    throw new ApiError(
      400,
      `Subjects/subject not found: ${nonExistingSubjects.join(", ")}`
    );
  }

  if (!subjects) {
    throw new ApiError(400, "subjects are required !");
  }
  if (classExist) {
    throw new ApiError(400, "ClassName already exist");
  }

  const classData = await Class.create({
    className: className?.toUpperCase(),
    classTeacherID: findteacher?._id,
    subjects: findSubjects?.map((sub) => sub?._id),
  });

  if (!classData) {
    return new ApiError("Class not created", 400);
  }

  // Update each subject with the new class ID
  for (const sub of findSubjects) {
    sub?.classes?.push(classData?._id);
    await sub.save({ validateBeforeSave: false });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, classData, "Class created successfully"));
});

// single classes --admin
const singleClass = asyncHandler(async (req, res) => {
  const classer = await Class.findById(req.params?.id).populate(
    "students classTeacherID"
  );

  if (!classer) {
    throw new ApiError(404, "class not found !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, classer, `class ${classer?.className}`));
});

// update class with className, teacher, subjects --admin
const updateClass = asyncHandler(async (req, res) => {
  const { className, email, fullName, subjects, teachersOfClass } = req.body;

  const spl = subjects?.split(",");

  if (spl?.length < 1) {
    if (!subjects?.match(",")) {
      throw new ApiError(
        400,
        "subjects must ends with trailing commas ex: subject1, subject2 !"
      );
    }
  }

  if ([className, email, fullName].some((fields) => fields?.trim() === "")) {
    throw new ApiError(400, "all feilds are required !");
  }
  const findteacher = await Teacher.findOne({ $or: [{ email }, { fullName }] });
  if (!findteacher) {
    throw new ApiError(400, "teacher with email/fullName not found");
  }

  const classExist = await Class.findOne({
    className: className?.toUpperCase(),
  });

  if (!classExist?.classTeacherID) {
    const teacherExist = await Class.findOne({
      classTeacherID: findteacher?._id,
    });

    if (teacherExist) {
      throw new ApiError(
        400,
        "Class teacher already assigned to another class"
      );
    }
  }

  const firstlattertoUpperCaseSubjects = spl?.map((sub) =>
    changeToUpperCase(sub)
  );
  const findSubjects = await Subject.find({
    subjectName: { $in: firstlattertoUpperCaseSubjects },
  });
  // map over find subjects
  const existingSubjects = findSubjects?.map((sub) => sub?.subjectName);
  // check if user provides subjects/subject are present in existingSubjects
  const nonExistingSubjects = firstlattertoUpperCaseSubjects.filter(
    (sub) => !existingSubjects.includes(sub)
  );

  if (nonExistingSubjects.length > 0) {
    throw new ApiError(
      400,
      `Subjects/subject not found: ${nonExistingSubjects.join(", ")}`
    );
  }

  if (!subjects) {
    throw new ApiError(400, "subjects are required !");
  }

  if (!classExist || classExist) {
    const classData = await Class.findByIdAndUpdate(
      req.params?.id,
      {
        className: className?.toUpperCase(),
        classTeacherID: findteacher?._id,
        subjects: findSubjects?.map((sub) => sub?._id),
        teachersOfClass: teachersOfClass,
      },
      { new: true },
      { validateBeforeSave: false }
    );

    if (!classData) {
      return new ApiError("Class not updated", 400);
    }

    // Remove class ID from all subjects
    const allSubjects = await Subject.find({});
    for (const sub of allSubjects) {
      sub.classes = sub?.classes?.filter(
        (sbj) => sbj.toString() !== classData?._id.toString()
      );
      await sub.save({ validateBeforeSave: false });
    }

    // Update each subject with the new class ID
    for (const sub of findSubjects) {
      sub?.classes?.push(classData?._id);
      await sub.save({ validateBeforeSave: false });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, classData, "Class updated successfully"));
  }
});

// delete class --admin
const deleteClass = asyncHandler(async (req, res) => {
  const classer = await Class.findByIdAndDelete(req.params?.id);

  if (!classer) {
    throw new ApiError(404, "class not found !");
  }

  const removeClassIdFromSubjects = await Subject.find({
    classes: req.params?.id,
  });

  const removeStudentsClassNameId = await Student.find({
    className: req.params?.id,
  });

  if(removeStudentsClassNameId?.length !== 0){
    for (const st of removeStudentsClassNameId) {
      st.className = null;
      await st.save({ validateBeforeSave: false });
    }
  }

  const mapoverFind = removeClassIdFromSubjects?.map((sub) => {
    return (sub.classes = sub?.classes?.filter(
      (id) => id.toString() !== req.params?.id.toString()
    ));
  });

  // take for off loop to save for all classes
  for (let sub of removeClassIdFromSubjects) {
    await sub.save({ validateBeforeSave: false });
  }

  return res.status(200).json(new ApiResponse(200, {}, "deleted successfully"));
});

export { addClass, allClasses, updateClass, deleteClass, singleClass };
