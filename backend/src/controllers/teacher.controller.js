import { Teacher } from "../models/teacher.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinaryUploadImg } from "../utils/cloudinary.js";
import { parseDate } from "../utils/parseDate.js";

const getAllTeachers = asyncHandler(async (req, res, next) => {
  const teachers = await Teacher.find();

  return res
    .status(200)
    .json(new ApiResponse(200, "Teachers fetched successfully", teachers));
});

// teacher by id
const getTeacherById = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    throw new ApiError(404, "Teacher not found !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Teacher fetched successfully", teacher));
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

  const teacherExists = await Teacher.findOne({$or:[{email},{fullName}]});
  const phoneExists = await Teacher.findOne({phone});
  const dOBExists = await Teacher.findOne({DOB});

  if (teacherExists) {
    throw new ApiError(400, "Teacher with email or fullName already exists !");
  }
  else if(phone?.length !== 11){
    throw new ApiError(400, "Invalid phone number !");
  }
  else if(phoneExists){
    throw new ApiError(400, "Phone number already exists !");
  }
  else if(dOBExists){
    throw new ApiError(400, "Date of birth already exists !");
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
    gender: gender[0].toUpperCase() + gender.substr(1, gender.length),
    DOB: parsedDOB,
    avatar: avatar.url,
    joiningDate: parsedJoiningDate,
    bloodGroup: bloodGroup.toUpperCase(),
    subject: subject[0].toUpperCase() + subject.substr(1, subject.length),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Teacher added successfully", teacher));
});

// add classes to ClassesTuaght array of single teacher   
export { addTeacher };
