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
  const classer = await Class.findById(req.params?.id)
  .populate({
    path: "classTeacherID",
    select: "fullName email",
  })
  .populate({
    path: "students",
    select: "fullName email",
  })
  .populate({
    path: "teachersOfClass",
    select: "fullName email",
  })
  .populate({
    path: "subjects",
    select: "subjectName",
  })

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
  const findteacher = await Teacher.findOne({email: email, fullName: fullName});
  if (!findteacher) {
    throw new ApiError(400, "teacher with email/fullName not found");
  }

  const classExist = await Class.findById({
    _id: req.params?.id,
  });
  const allClass = await Class.find({});
  if(!classExist){
    throw new ApiError(400, `${className} not found !`);
  }
  if(allClass.includes(className)){
    throw new ApiError(400, "className already exist !");
  }

  if (classExist?.classTeacherID === null) {
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

  if (classExist) {
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
      throw new ApiError(400,"Class not updated");
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
  // const classer = await Class.findByIdAndDelete(req.params?.id);

  // if (!classer) {
  //   throw new ApiError(404, "class not found !");
  // }
  // // remove that class id from classes of subjects
  // const removeClassIdFromSubjects = await Subject.find({
  //   classes: req.params?.id,
  // });

  // for(const cls of removeClassIdFromSubjects){
  //     cls?.classes?.pull(req.params?.id)
  //     await cls.save({ validateBeforeSave: false });
  // }
  


  // remove deleted className from students className connects with it  
  const cls = await Class.findById(req.params?.id)
  const studentsId = await Student.find({_id: {$in: cls?.students}});
  console.log(studentsId);
  // const newst = ""
  // if(studentsId?.length !== 0){
  //   for (const st of studentsId) {
  //     st.className = newst;
  //     await st.save({ validateBeforeSave: false });
  //     console.log("save st");
  //   }
  // }


  // remove  deleted class classTeachers connects with it
  // const teachersOfClass  = await Teacher.find()

  // if(teachersOfClass?.length !== 0){
  //   for(const cls of teachersOfClass){
  //     cls?.classesTaught?.pull(req.params?.id)
  //     await cls.save({ validateBeforeSave: false });
  //     console.log("save teacher");
  //   }
  // }

  // return res.status(200).json(new ApiResponse(200, {}, "deleted successfully"));
});

export { addClass, allClasses, updateClass, deleteClass, singleClass };
