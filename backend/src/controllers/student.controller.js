import { Student } from "../models/student.model.js";
import { Class } from "../models/class.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinaryUploadImg } from "../utils/cloudinary.js";

// all students --admin
const getAllStudent = asyncHandler(async (req, res, next) => {
  const students = await Student.find();

  return res
    .status(200)
    .json(new ApiResponse(200, students, "Students fetched successfully"));
});

// student by id
const getStudentById = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    throw new ApiError(404, "Student not found !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, student, "Student fetched successfully"));
});

// add student --admin
const addStudent = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    fullName,
    admissionClass,
    rollNo,
    age,
    className,
    fatherName,
    gender,
    DOB,
    joiningDate,
    bloodGroup,
    email,
    address,
    phone,
  } = req.body;

  if (
    [
      firstName,
      fullName,
      fatherName,
      admissionClass,
      rollNo,
      age,
      className,
      email,
      phone,
      address,
      gender,
      DOB,
      joiningDate,
      bloodGroup,
    ].some((feild) => feild === "")
  ) {
    throw new ApiError(400, "All fields are required !");
  }

  const StudentExists = await Student.findOne({
    $or: [{ email }, { fullName }],
  });
  const phoneExists = await Student.findOne({ phone });
  const dOBExists = await Student.findOne({ DOB });
  // const rollNoExists = await Student.findOne({ rollNo });

  if (StudentExists) {
    throw new ApiError(400, "Student with email or fullName already exists !");
  } else if (phone?.length !== 11) {
    throw new ApiError(400, "Invalid phone number !");
  } else if (phoneExists) {
    throw new ApiError(400, "Phone number already exists !");
  } else if (dOBExists) {
    throw new ApiError(400, "Date of birth already exists !");
  }

  const validClass = await Class.findOne({ className: className });

  if (!validClass) {
    throw new ApiError(400, `${className} not found ! please check Classes`);
  }

  // if class  have students
  if (validClass?.students?.length !== 0) {
    const classStudents = validClass?.students;
    const studentsfindId = await Student.find({ _id: classStudents });
    const mapoverStudents = studentsfindId?.map((student) => student?.rollNo);

    const isrollNoAlreadyAsignedInThatClass = mapoverStudents?.find(
      (number) => number == rollNo
    );

    if (isrollNoAlreadyAsignedInThatClass) {
      throw new ApiError(
        400,
        `rollNo already assigned to another student in ${className}  !`
      );
    }
  }

  let avatarLocalPath = req.file ? req.file?.path : null;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Student image is required !");
  }

  const avatar = await cloudinaryUploadImg(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Student image is required !");
  }

  const student = await Student.create({
    firstName,
    fullName,
    rollNo,
    age,
    admissionClass,
    fatherName,
    className: validClass?._id,
    email,
    phone,
    address,
    gender: gender[0].toUpperCase() + gender.substr(1, gender.length),
    DOB,
    avatar: avatar.url,
    joiningDate,
    bloodGroup: bloodGroup.toUpperCase(),
  });

  validClass.students.push(student._id);
  console.log("done");
  await validClass.save({ validateBeforeSave: false });
  console.log("done saved");

  return res
    .status(201)
    .json(new ApiResponse(201, student, "Student added successfully"));
});

// update student
const updateStudent = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    fullName,
    admissionClass,
    rollNo,
    age,
    className,
    fatherName,
    gender,
    DOB,
    joiningDate,
    bloodGroup,
    email,
    address,
    phone,
  } = req.body;

  const student = await Student.findById(req.params.id);
  if (!student) {
    throw new ApiError(404, "Student not found!");
  }

  if (phone?.length > 11) {
    throw new ApiError(400, "Invalid phone number !");
  }

  // Find the class of the  student by className of student ClassName id
  const MatchOldClass = await Class.findById(student?.className);

  const validClass = await Class.findOne({ className: className });
  if (!validClass) {
    throw new ApiError(400, `${className} not found ! please check Classes`);
  }

  // if class  have students
  if (validClass?.students?.length !== 0) {
    const classStudents = validClass?.students;
    const studentsfindId = await Student.find({ _id: classStudents });
    const mapoverStudents = studentsfindId?.map((student) => student?.rollNo);

    const isrollNoAlreadyAsignedInThatClass = mapoverStudents?.find(
      (number) => number == rollNo
    );

    if (isrollNoAlreadyAsignedInThatClass) {
      throw new ApiError(
        400,
        `rollNo already assigned to another student in ${className}  !`
      );
    }
  }

  if (
    validClass &&
    validClass?._id.toString() === MatchOldClass?._id.toString()
  ) {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        fullName,
        admissionClass,
        rollNo,
        className: validClass?._id,
        age,
        fatherName,
        DOB,
        joiningDate,
        email,
        gender:
          gender && gender[0].toUpperCase() + gender.substr(1, gender.length),
        bloodGroup: bloodGroup && bloodGroup.toUpperCase(),
        address,
        phone,
      },
      { new: true }
    );

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          updatedStudent,
          "Student updated with oldclass successfully"
        )
      );
  }

  // if className is changed
  else {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        fullName,
        admissionClass,
        rollNo,
        age,
        className: validClass?._id,
        fatherName,
        DOB,
        joiningDate,
        email,
        gender:
          gender && gender[0].toUpperCase() + gender.substr(1, gender.length),
        bloodGroup: bloodGroup && bloodGroup.toUpperCase(),
        address,
        phone,
      },
      { new: true }
    );

    //remove student from class
    if (MatchOldClass && MatchOldClass?.students !== null) {
      MatchOldClass.students = MatchOldClass.students.filter(
        (std) => std.toString() !== student._id.toString()
      );
      await MatchOldClass.save({ validateBeforeSave: false });
    }
    // Add student ID to the new class
    validClass?.students.push(student?._id);
    await validClass.save({ validateBeforeSave: false });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          updatedStudent,
          "Student updated with newclass successfully"
        )
      );
  }

});

// delete student
const deleteStudent = asyncHandler(async (req, res) => {
  // const student = await Student.findByIdAndDelete(req.params.id)
  const removeStFromClass = await Class.findOne({
    students: { $in: req.params?.id },
  });
  if (!removeStFromClass) {
    throw new ApiError(404, "Student not found!");
  }
  console.log(removeStFromClass);
  // if (!student) {
  //   throw new ApiError(404, "Student not found!");
  // }

  // return res.status(200).json(new ApiResponse(200, null, "Student deleted successfully"))
});

// add academic record
const addAcademicRecordStudent = asyncHandler(async (req, res, next) => {
  const {
    year,
    pClass,
    exam,
    grade,
    percentage,
    positionInClass,
    marksObtained,
    totalMarks,
  } = req.body;

  const student = await Student.findById(req.params.id);

  if (!student) {
    throw new ApiError(404, "Student not found !");
  }
  const existingRecord = student?.academicHistory.find(
    (record) => record?.year === year
  );
  if (existingRecord) {
    throw new ApiError(404, `Academic record of year ${year} already exists !`);
  }

  const pushAcademicRecord = student?.academicHistory.push({
    year,
    pClass,
    exam: exam.toUpperCase(),
    grade: grade?.toUpperCase(),
    percentage,
    positionInClass,
    marksObtained,
    totalMarks,
  });
  console.log("done");
  await student.save({ validateBeforeSave: false });
  console.log("saved");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        pushAcademicRecord,
        `Academic record of ${student?.fullName} added successfully`
      )
    );
});

// all academic record of student
const allAcademicRecordStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    throw new ApiError(404, "Student not found !");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, student?.academicHistory, "Academic record fetched")
    );
});

// update academic record
const updatedStudentAcedamicRecord = asyncHandler(async (req, res) => {
  const {
    recordId,
    year,
    pClass,
    exam,
    grade,
    percentage,
    positionInClass,
    marksObtained,
    totalMarks,
  } = req.body;

  const findStudent = await Student.findById(req.params.id);
  if (!findStudent) {
    throw new ApiError(404, "Student not found!");
  }

  const record = findStudent.academicHistory.find(
    (r) => r._id.toString() === recordId
  );

  if (!record) {
    throw new ApiError(404, "Academic record not found!");
  }

  const updatedRecord = (record.year = year || record.year);
  record.pClass = pClass || record.pClass;
  record.exam = exam || record.exam;
  record.grade = grade || record.grade;
  record.percentage = percentage || record.percentage;
  record.positionInClass = positionInClass || record.positionInClass;
  record.marksObtained = marksObtained || record.marksObtained;
  record.totalMarks = totalMarks || record.totalMarks;
  console.log("done");

  if (!updatedRecord) {
    throw new ApiError(404, "record not updated");
  }
  console.log(updatedRecord);

  const save = await findStudent.save();

  if (save) {
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          updatedRecord,
          `${findStudent?.fullName}record updated successfuly`
        )
      );
  }
});

// delete academic record
const deleteAcademicRecord = asyncHandler(async (req, res) => {
  const findStudent = await Student.findById(req.params.id);
  if (!findStudent) {
    throw new ApiError(404, "Student not found!");
  }

  const record = findStudent?.academicHistory.find(
    (r) => r._id.toString() === req.body?.recordId
  );

  if (!record) {
    throw new ApiError(404, "Academic record not found!");
  }

  const updatedRecord = findStudent?.academicHistory.filter(
    (r) => r._id.toString() !== req.body.recordId
  );

  const save = await findStudent.save();

  if (save) {
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          updatedRecord,
          `${findStudent?.fullName}record deleted successfuly`
        )
      );
  }
});

export {
  addStudent,
  getAllStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  allAcademicRecordStudent,
  addAcademicRecordStudent,
  updatedStudentAcedamicRecord,
  deleteAcademicRecord,
};
