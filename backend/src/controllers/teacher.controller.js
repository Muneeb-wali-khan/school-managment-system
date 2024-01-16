import { Teacher } from "../models/teacher.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinaryUploadImg } from "../utils/cloudinary.js";
import { parseDate } from "../utils/parseDate.js";
import { Subject } from "../models/subject.model.js";
import { changeToUpperCase } from "../utils/toUpperCase.js";

const getAllTeachers = asyncHandler(async (req, res, next) => {
  const teachers = await Teacher.find();

  return res
    .status(200)
    .json(new ApiResponse(200, teachers, "Teachers fetched successfully"));
});

// teacher by id
const getTeacherById = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    throw new ApiError(404, "Teacher not found !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, teacher, "Teacher fetched successfully"));
});

// add teacher --admin
const addTeacher = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    fullName,
    age,
    classesTaught,
    email,
    phone,
    address,
    gender,
    DOB,
    joiningDate,
    bloodGroup,
    subject,
  } = req.body;

  if (
    [
      firstName,
      fullName,
      age,
      email,
      phone,
      classesTaught,
      address,
      gender,
      DOB,
      joiningDate,
      bloodGroup,
      subject,
    ].some((feild) => feild === "")
  ) {
    throw new ApiError(400, "All fields are required !");
  }

  const teacherExists = await Teacher.findOne({
    $or: [{ email }, { fullName }],
  });
  const phoneExists = await Teacher.findOne({ phone });
  const dOBExists = await Teacher.findOne({ DOB });
  const subjectExists = await Subject.findOne({
    subjectName: changeToUpperCase(subject),
  });

  if (teacherExists) {
    throw new ApiError(400, "Teacher with email or fullName already exists !");
  } else if (phone?.length !== 11) {
    throw new ApiError(400, "Invalid phone number !");
  } else if (phoneExists) {
    throw new ApiError(400, "Phone number already exists !");
  } else if (dOBExists) {
    throw new ApiError(400, "Date of birth already exists !");
  }

  if (!subjectExists) {
    throw new ApiError(400, `${subject} Subject not found !`);
  }

  let avatarLocalPath = req.file ? req.file?.path : null;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Teacher image is required !");
  }

  const avatar = await cloudinaryUploadImg(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Teacher image is required !");
  }

  const parsedDOB = parseDate(DOB);
  const parsedJoiningDate = parseDate(joiningDate);

  const teacher = await Teacher.create({
    firstName,
    fullName,
    age,
    classesTaught,
    email,
    phone,
    address,
    gender: changeToUpperCase(gender),
    DOB: parsedDOB,
    avatar: avatar.url,
    joiningDate: parsedJoiningDate,
    bloodGroup: bloodGroup.toUpperCase(),
    subject: changeToUpperCase(subject),
  });

  subjectExists?.teachers?.push(teacher?._id);
  await subjectExists.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(
      new ApiResponse(201, teacher, "Teacher and subject added successfully")
    );
});



// update teacher --admin
const updateTeacher = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    fullName,
    age,
    classesTaught,
    email,
    phone,
    address,
    gender,
    DOB,
    joiningDate,
    bloodGroup,
    subject,
  } = req.body;

  const existingTeacher = await Teacher.findById(req.params.id);
  const oldsubject = await Subject.findOne({
    subjectName: existingTeacher?.subject,
  });


  if (!existingTeacher) {
    throw new ApiError(400, `Teacher not found !`);
  }
  if (!oldsubject) {
    throw new ApiError(400, `${subject} Subject not found !`);
  }

  const parsedDOB = parseDate(DOB || existingTeacher?.DOB);
  const parsedJoiningDate = parseDate(
    joiningDate || existingTeacher?.joiningDate
  );



  if (subject && changeToUpperCase(subject) === existingTeacher?.subject) {
    // if subject name not changed
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        fullName,
        age,
        classesTaught,
        email,
        phone,
        address,
        gender: gender && changeToUpperCase(gender),
        DOB: parsedDOB,
        joiningDate: parsedJoiningDate,
        bloodGroup: bloodGroup && bloodGroup.toUpperCase(),
        subject: subject && changeToUpperCase(subject),
      },
      { new: true },
      { validateBeforeSave: false }
    );

    const isTeacherInSubjectTeachersArray = await Subject.findOne({teachers: {$in: req.params?.id}})
    if(isTeacherInSubjectTeachersArray === null){
      const subjectExists = await Subject.findOne({
        subjectName: changeToUpperCase(subject),
      });
      subjectExists?.teachers?.push(existingTeacher?._id);
      await subjectExists.save({ validateBeforeSave: false });
      console.log("save");
    }

    console.log(" sub name not changed");

    return res
      .status(200)
      .json(new ApiResponse(200, teacher, "Teacher updated successfully"));
  } else {
    console.log(" sub name changed");

    // if subject name  change
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        fullName,
        age,
        classesTaught,
        email,
        phone,
        address,
        gender: gender && changeToUpperCase(gender),
        DOB: parsedDOB,
        joiningDate: parsedJoiningDate,
        bloodGroup: bloodGroup?.toUpperCase(),
        subject: subject && changeToUpperCase(subject),
      },
      { new: true },
      { validateBeforeSave: false }
    );

    if (oldsubject) {
      const removeSubject = (oldsubject.teachers = oldsubject?.teachers?.filter(
        (id) => id.toString() !== existingTeacher?._id.toString()
      ));
      if (removeSubject) {
        console.log("done deleted");
        await oldsubject.save({ validateBeforeSave: false });
      }
    }

    const newSubject = await Subject.findOne({
      subjectName: changeToUpperCase(subject),
    });
    if (newSubject) {
      newSubject.teachers.push(existingTeacher._id);
      console.log("done new sub");
      await newSubject.save({ validateBeforeSave: false });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, teacher, "Teacher updated successfully"));
  }
});


// if deleted the teacher aslo remove deleted teacher from subject teachers array and class ClassTeacherId

const deleteTeacher = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    throw new ApiError(400, "Teacher not found !");
  }

  await Teacher.findByIdAndDelete(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, teacher, "Teacher deleted successfully"));
})

// add classes to ClassesTuaght array of single teacher
export { addTeacher, updateTeacher, getAllTeachers ,deleteTeacher};
