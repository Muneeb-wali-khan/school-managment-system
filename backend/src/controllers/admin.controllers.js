import { Student } from "../models/student.model.js";
import { Class } from "../models/class.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinaryUploadImg } from "../utils/cloudinary.js";
import { Teacher } from "../models/teacher.model.js";
import { Subject } from "../models/subject.model.js";
import { changeToUpperCase } from "../utils/toUpperCase.js";
import { User } from "../models/user.model.js";
import { RemovecloudinaryExistingImg } from "../utils/cloudinary.js";
import { extractId } from "../utils/extractCloudinaryId.js";
import { parseDate } from "../utils/parseDate.js";
import { Attendance } from "../models/attendance.mode.js";
import { AdminNotify } from "../models/notification.model.js";
import { Curriculum } from "../models/curriculum.model.js";
import mongoose from "mongoose";

// =======================================USER CONTROLLERS --ADMIN== START =================================================

//  get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select(
    "-password -refreshToken -uniqueCode"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, users, "users fetched successfully !"));
});

// get single user
const singleUser  = asyncHandler(async(req,res)=>{
  const id = req.params?.id;

  const user = await User.findOne({_id: id}).select("-password -uniqueCode -refreshToken")

  if(!user){
    throw new ApiError(404, "user not found !")
  }

  return res.status(200).json(
    new ApiResponse(200, user, "user fetched successfully !")
  )

})

// update user role
const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!role) {
    throw new ApiError(400, "role is required !");
  }

  const user = await User.findByIdAndUpdate(
    req.params?.id,
    {
      $set: {
        role,
      },
    },
    { new: true }
  ).select("-password -uniqueCode");

  if (!user) {
    throw new ApiError(404, "failed to update user role !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "user role updated successfully !"));
});

//  delete user
const deleteUser = asyncHandler(async (req, res) => {
  const findUser = await User.findById(req.params?.id);

  const publicId = extractId(findUser?.avatar);
  await RemovecloudinaryExistingImg(publicId);

  const user = await User.findByIdAndDelete(req.params?.id);

  if (!user) {
    throw new ApiError(404, "user not found !");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "user deleted successfully !"));
});

// update user avatar
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file ? req.file?.path : null;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Image is required !");
  }

  const avatar = await cloudinaryUploadImg(avatarLocalPath);

  if (!avatar?.url) {
    throw new ApiError(400, "Image is required !");
  }

  const publicId = extractId(req.user?.avatar);
  await RemovecloudinaryExistingImg(publicId);

  const user = await User.findByIdAndUpdate(
    req.params?.id,
    {
      $set: {
        avatar: avatar?.url,
      },
    },
    { new: true }
  ).select("-password -uniqueCode");

  if (!user) {
    throw new ApiError(404, "failed to update user avatar !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "user avatar updated successfully !"));
});


// send notification for all teachers
const sendNotification = asyncHandler(async (req, res) => {
  const { title, desc,fileLink } = req.body;

  if (!title || !desc) {
    throw new ApiError(400, "All fields are required !");
  }

  //convert to uppercase each word first character
  const spl = title?.split(" ");
  const newTitle = spl?.map((w) => w?.[0].toUpperCase() + w?.slice(1, w?.length))?.join(" ")

  const createNotification = await AdminNotify.create({
   title: newTitle,
   desc,
   fileLink
 })

  if(!createNotification){
    throw new ApiError(400, "failed to send notification !")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createNotification, "notification sent successfully !"));
})

// send notification for single teacher
const notifySingleTeacher = asyncHandler(async (req, res) => {
  const { title, desc,fileLink,teacherFullName,teacherEmail } = req.body;

  if (!title || !desc || !teacherFullName || !teacherEmail) {
    throw new ApiError(400, "All fields are required !");
  }

  const findTeacherWithEmailAndFullName = await Teacher.findOne({
    $and:[{email: teacherEmail},{fullName: teacherFullName}]
  })

  if(!findTeacherWithEmailAndFullName){
    throw new ApiError(400, "teacher with email or Fullname not found !")
  }
  
  //convert to uppercase each word first character
  const spl = title?.split(" ");
  const newTitle = spl?.map((w) => w?.[0].toUpperCase() + w?.slice(1, w?.length))?.join(" ")

  const createNotification = await AdminNotify.create({
   title: newTitle,
   desc,
   fileLink,
   teacherFullName,
   teacherEmail
 })

  if(!createNotification){
    throw new ApiError(400, "failed to send notification !")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createNotification, "notification sent successfully !"));
})

// get all notifications
const getAllNotifications = asyncHandler(async (req, res) => {
  const notifications = await AdminNotify.find({})

  return res
    .status(200)
    .json(new ApiResponse(200, notifications, "notifications fetched successfully !"));
})

// get notification by id
const getNotificationById = asyncHandler(async (req, res) => {
  const notification = await AdminNotify.findById(req.params?.id)

  if(!notification){
    throw new ApiError(404, "notification not found !")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notification, "notification fetched successfully !"));

})

// update notification
const updateNotification = asyncHandler(async (req, res) => {
  const { title, desc,fileLink ,teacherFullName,teacherEmail} = req.body;

  if (!title || !desc) {
    throw new ApiError(400, "All fields are required !");
  }
  // if email and fullname are not empty strings then
  if(teacherEmail !== "" && teacherFullName !== ""){
    const findTeacherWithEmailAndFullName = await Teacher.findOne({
      $and:[{email: teacherEmail},{fullName: teacherFullName}]
    })
  
    if(!findTeacherWithEmailAndFullName){
      throw new ApiError(400, "teacher with email or Fullname not found !")
    }

    const updateNotification = await AdminNotify.findByIdAndUpdate(
      req.params?.id,
      {
        $set: {
          title,
          desc,
          fileLink,
          teacherFullName,
          teacherEmail
        },
      },
      { new: true }
    );
    if (!updateNotification) {
      throw new ApiError(404, "failed to update notification !");
    }
    return res
    .status(200)
    .json(new ApiResponse(200, updateNotification, "notification updated successfully !"));
  }

  // if email and fullname are empty strings then
  const updateNotification = await AdminNotify.findByIdAndUpdate(
    req.params?.id,
    {
      $set: {
        title,
        desc,
        fileLink,
        teacherFullName,
        teacherEmail
      },
    },
    { new: true }
  );

  if (!updateNotification) {
    throw new ApiError(404, "failed to update notification !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateNotification, "notification updated successfully !"));
})

// delete notification
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await AdminNotify.findByIdAndDelete(req.params?.id)

  if(!notification){
    throw new ApiError(404, "notification not found !")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "notification deleted successfully !"));
})


// =======================================USER CONTROLLERS --ADMIN== END =================================================








// =======================================STUDENT CONTROLLERS --ADMIN== START =================================================
// all students --admin
const getAllStudent = asyncHandler(async (req, res) => {
  const students = await Student.find()
    .select("rollNo fullName gender email className createdAt")
    .populate({
      path: "className",
      select: "className",
    });

  return res
    .status(200)
    .json(new ApiResponse(200, students, "Students fetched successfully"));
});

// student by id
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id).populate({
    path: "className",
    select: "className",
  });

  if (!student) {
    throw new ApiError(404, "Student not found !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, student, "Student fetched successfully"));
});

// add student --admin
const addStudent = asyncHandler(async (req, res) => {
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
    monthlyFee,
    securityFee,
    labFee,
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
    email: email,
    fullName: fullName,
  });
  const phoneExists = await Student.findOne({ phone: phone });
  const dOBExists = await Student.findOne({ DOB: DOB });

  if (StudentExists) {
    throw new ApiError(400, "Student with email or fullName already exists !");
  } else if (phone?.length > 11) {
    throw new ApiError(400, "Invalid phone number !");
  } else if (phoneExists) {
    throw new ApiError(400, "Phone number already exists !");
  } else if (dOBExists) {
    throw new ApiError(400, "Date of birth already exists !");
  }

  const validClass = await Class.findOne({
    className: className?.toUpperCase(),
  });

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
    monthlyFee,
    securityFee,
    labFee,
  });

  validClass?.students?.push(student._id);
  console.log("done");
  await validClass.save({ validateBeforeSave: false });
  console.log("done saved");

  return res
    .status(201)
    .json(new ApiResponse(201, student, "Student added successfully"));
});

// update student
const updateStudent = asyncHandler(async (req, res) => {
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
    monthlyFee,
    securityFee,
    labFee,
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

  const validClass = await Class.findOne({
    className: className?.toUpperCase(),
  });
  if (!validClass) {
    throw new ApiError(400, `${className} not found ! please check Classes`);
  }

  if (
    validClass &&
    validClass?._id.toString() === MatchOldClass?._id.toString()
  ) {
    console.log("yep");
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
        monthlyFee,
        securityFee,
        labFee,
      },
      { new: true }
    );

    return res
      .status(201)
      .json(
        new ApiResponse(201, updatedStudent, "Student updated successfully")
      );
  }

  // if className is changed
  else {
    console.log("c changed");
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
        monthlyFee,
        securityFee,
        labFee,
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

// update student avatar
const updateAvatarStudent = asyncHandler(async (req, res) => {
  const { avatar } = req.body;
  const id = req.params?.id;
  // find student by id
  const studentFind = await Student.findOne({ _id: id });

  // extract the old avatar public id for removal on cloudinary
  const avataroldPublicId = extractId(studentFind?.avatar);

  // if public id present so remove
  if (avataroldPublicId) {
    const remOldAvatar = await RemovecloudinaryExistingImg(avataroldPublicId);
    console.log("done admin sab");
  }

  // now get the new avatar file path
  let avatarLocalPath = req.file ? req.file?.path : null;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Student image is required 1!");
  }

  // now upload new file to cloudinary
  const avatarNew = await cloudinaryUploadImg(avatarLocalPath);

  if (!avatarNew?.url) {
    throw new ApiError(400, "Student image is required 2!");
  }

  // now update the student avatar with new url
  const student = await Student.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        avatar: avatarNew?.url,
      },
    },
    { new: true }
  );

  if (!student) {
    throw new ApiError(400, `Student avatar not updated !`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, student, "student avatar updated successfully"));
});

// delete student
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  const removeStFromClass = await Class.findOne({
    students: { $in: req.params?.id },
  });
  if (!removeStFromClass) {
    throw new ApiError(404, "Student not found!");
  }
  if (!student) {
    throw new ApiError(404, "Student not found!");
  }

  removeStFromClass?.students?.pull(req.params?.id);
  await removeStFromClass.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Student deleted successfully"));
});

// add academic record
const addAcademicRecordStudent = asyncHandler(async (req, res) => {
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

    if ([
      pClass,
      exam,
      grade,
      positionInClass
    ].some((val) => val?.trim() === "") ||
    [year, percentage, marksObtained, totalMarks].some((val) => val === "" || val === null || val === undefined)
    ) {
    throw new ApiError(400, "All fields are Required !");
    }
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

// single academic record of student
const singleAcademicRecord = asyncHandler(async (req, res) => {
  const student = await Student.find({});

  // get all students academic records
  const findAcademicHistory = student.map((val) => val?.academicHistory);
  // extract your record matching the params id
  const findId = findAcademicHistory.map((val) =>
    val?.filter((ids) => ids?._id?.toString() === req.params?.id)
  );
  // filter out only actual record remove empty arrays
  const filterActualRecord = findId?.filter((val) => val?.length !== 0);

  if (!filterActualRecord) {
    throw new ApiError(404, "record not found !");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, filterActualRecord?.[0], "Academic record fetched")
    );
});

// update academic record
const updatedStudentAcedamicRecord = asyncHandler(async (req, res) => {
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

  const student = await Student.find({});

  if (!student) {
    throw new ApiError(404, "Students not found!");
  }

  const findAcademicHistory = student.map((val) => val?.academicHistory);
  const findId = findAcademicHistory.map((val) =>
    val?.filter((ids) => ids?._id?.toString() === req.params?.id)
  );
  const filterActualRecord = findId?.filter((val) => val?.length !== 0);
  const pickARecord = filterActualRecord?.[0]?.[0];

  if (!pickARecord) {
    throw new ApiError(404, "Record not found!");
  }

  // Update the properties with the new values
  pickARecord.year = year || pickARecord.year;
  pickARecord.pClass = pClass || pickARecord.pClass;
  pickARecord.exam = exam || pickARecord.exam;
  pickARecord.grade = grade || pickARecord.grade;
  pickARecord.percentage = percentage || pickARecord.percentage;
  pickARecord.positionInClass = positionInClass || pickARecord.positionInClass;
  pickARecord.marksObtained = marksObtained || pickARecord.marksObtained;
  pickARecord.totalMarks = totalMarks || pickARecord.totalMarks;

  console.log("done");

  // Save the updated record using findByIdAndUpdate
  const updatedRecord = await Student.findOneAndUpdate(
    { "academicHistory._id": req.params.id },
    { $set: { "academicHistory.$": pickARecord } },
    { new: true }
  );

  if (updatedRecord) {
    return res
      .status(201)
      .json(new ApiResponse(201, updatedRecord, "Record updated successfully"));
  } else {
    throw new ApiError(500, "Failed to update record");
  }
});

// delete academic record
const deleteAcademicRecord = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  const student = await Student.find({});

  if (!student) {
    throw new ApiError(404, "Students not found!");
  }

  const findAcademicHistory = student.map((val) => val?.academicHistory);
  const findId = findAcademicHistory.map((val) =>
    val?.filter((ids) => ids?._id?.toString() === req.params?.id)
  );
  const filterActualRecord = findId?.filter((val) => val?.length !== 0);
  const pickARecord = filterActualRecord?.[0]?.[0];

  if (!pickARecord) {
    throw new ApiError(404, "Record not found!");
  }

  // Remove the specific academicHistory record using update and $pull
  const removeRecord = await Student.findOneAndUpdate(
    { "academicHistory._id": req.params.id },
    { $pull: { academicHistory: { _id: req.params.id } } },
    { new: true }
  );

  if (removeRecord) {
    return res
      .status(201)
      .json(new ApiResponse(201, removeRecord, "Record deleted successfully"));
  } else {
    throw new ApiError(500, "Failed to delete record");
  }
});



// =======================================STUDENT CONTROLLERS --ADMIN == END =================================================








// =======================================TEACHER CONTROLLERS --ADMIN == START =================================================

const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find().select("subject gender email fullName");
  const MapOverTeacherIds = teachers?.map((teacher)=> teacher?._id)

  // find classes by classTeacherID
  const findClasses = await Class.find({
    classTeacherID: { $in: MapOverTeacherIds }
  });

  // find classes which matches the  teacher id return as plain object extrac the className also
  const teacherWithClassName = teachers?.map((teacher)=>{
    const matchClass = findClasses?.find((cls)=> cls?.classTeacherID?.toString() === teacher?._id?.toString())
    return {
      ...teacher.toObject(),
      className: matchClass ? matchClass?.className : "N/A" 
    }
  })


  return res
    .status(200)
    .json(new ApiResponse(200, teacherWithClassName, "Teachers fetched successfully"));
});

// teacher by id
const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params?.id).populate({
    path: "classesTaught",
    select: "className",
  });

  if (!teacher) {
    throw new ApiError(404, "Teacher not found !");
  }

  const teacherOfClass = await Class.findOne({ classTeacherID: req.params?.id })
    .select("-students -teachersOfClass -subjects")
    .populate({
      path: "classTeacherID",
      select: "fullName",
    });

  const classNAME = teacherOfClass ? teacherOfClass.className : "N/A";

  return res
    .status(200)
    .json(
      new ApiResponse(200, [teacher, classNAME], "Teacher fetched successfully")
    );
});

// update teacher avatar
const updateTeacherAvatar = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  const teacher = await Teacher.findOne({ _id: id });

  if (!teacher) {
    throw new ApiError(404, "teacher not found");
  }

  if(teacher?.avatar !== ""){
    const findTeacherOldPublicId = teacher?.avatar;
    const extractPublicId = extractId(findTeacherOldPublicId);

  if (extractPublicId) {
    const removeOldid = await RemovecloudinaryExistingImg(extractPublicId);
    console.log("done old id admin");
  }
}

  // upload new avatar now
  const localPathAvatar = req.file ? req.file?.path : null;

  if (!localPathAvatar) {
    throw new ApiError(400, "Teacher image is required !");
  }

  const avatarUpload = await cloudinaryUploadImg(localPathAvatar);

  if (!avatarUpload?.url) {
    throw new ApiError(400, "Student image is required !");
  }

  const updatedAvatar = await Teacher.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        avatar: avatarUpload?.url,
      },
    },
    { new: true }
  );

  if (!updatedAvatar) {
    throw new ApiError(400, `teacher avatar not updated !`);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedAvatar, "teacher avatar updated successfully")
    );
});

// add teacher --admin
const addTeacher = asyncHandler(async (req, res) => {
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
    status,
    joiningDate,
    sallary,
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
  // remove white spaces between classnames
  let cleanedString = classesTaught.replace(/\s*,\s*/g, ",");
  // convert to array
  const spl = cleanedString?.split(",");

  if (spl?.length < 3) {
    if (!cleanedString?.match(",")) {
      throw new ApiError(
        400,
        "classes must ends with trailing commas ex: class 1,class 2 !"
      );
    }
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

  // map over classes and change its first character latter to uppercase
  const UpperCaseClasses = spl?.map((sub) => sub?.toUpperCase());
  // now find the all classes in one shot by $in
  const findClasses = await Class.find({
    className: { $in: UpperCaseClasses },
  });

  // map over find classes
  const existingClasses = findClasses?.map((sub) => sub?.className);
  // check if user provides classes/className are present in existingClasses
  const nonExistingClasses = UpperCaseClasses.filter(
    (sub) => !existingClasses.includes(sub)
  );

  if (nonExistingClasses.length > 0) {
    throw new ApiError(400, `${nonExistingClasses.join(", ")} not found:`);
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

  const teacher = await Teacher.create({
    firstName,
    fullName,
    age,
    classesTaught: findClasses?.map((cls) => cls?._id),
    email,
    phone,
    address,
    sallary,
    gender: changeToUpperCase(gender),
    DOB,
    status,
    avatar: avatar.url,
    joiningDate,
    bloodGroup: bloodGroup.toUpperCase(),
    subject: changeToUpperCase(subject),
  });

  // push teacher id in subject teachers array
  subjectExists?.teachers?.push(teacher?._id);
  await subjectExists.save({ validateBeforeSave: false });

  //push  teacher id in class/teachersOfClass array
  for (const sub of findClasses) {
    sub?.teachersOfClass?.push(teacher?._id);
    await sub.save({ validateBeforeSave: false });
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, teacher, "Teacher and subject added successfully")
    );
});

// update teacher --admin
const updateTeacher = asyncHandler(async (req, res) => {
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
    status,
    joiningDate,
    leavingDate,
    sallary,
    bloodGroup,
    subject,
  } = req.body;

  // remove white spaces between classnames
  let cleanedString = classesTaught?.replace(/\s*,\s*/g, ",");
  const spl = cleanedString?.split(",");

  if (spl?.length < 3) {
    if (!cleanedString?.match(",")) {
      throw new ApiError(
        400,
        "classes must ends with trailing commas ex: class 1,class 2 !"
      );
    }
  }

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

  // ================================================================update old classesTaught==================================================
  // update the Class/teachersOfClass and classes taught
  // map over classes and change its first character latter to uppercase
  const UpperCaseClasses = spl?.map((sub) => sub?.toUpperCase());
  // now find the all classes in one shot by $in
  const findClasses = await Class.find({
    className: { $in: UpperCaseClasses },
  });

  const oldClassIds = existingTeacher?.classesTaught;
  const oldTeacherClasses = await Class.find({ _id: oldClassIds });
  const mapOverOldTeacherClasses = oldTeacherClasses?.map(
    (sub) => sub?.className
  );
  const cls1 = mapOverOldTeacherClasses?.sort().join(","); // join(",") means first make it string and then seperate by comma
  const cls2 = UpperCaseClasses?.sort().join(",");

  // map over find classes
  const existingClasses = findClasses?.map((sub) => sub?.className);
  // check if user provides classes/className are present in existingClasses
  const nonExistingClasses = UpperCaseClasses.filter(
    (sub) => !existingClasses.includes(sub)
  );

  if (nonExistingClasses.length > 0) {
    throw new ApiError(400, `${nonExistingClasses.join(", ")} not found !`);
  }

  if (cls1 !== cls2) {
    console.log("classNames changed");
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        classesTaught: findClasses?.map((cls) => cls?._id),
      },
      { new: true },
      { validateBeforeSave: false }
    );

    // remove old teachers ids
    if (oldTeacherClasses?.length !== 0) {
      for (const sub of oldTeacherClasses) {
        console.log("removed old");
        sub?.teachersOfClass?.pull(req.params?.id);
        await sub.save({ validateBeforeSave: false });
      }
    }

    // push new findClasses ids in teachersOfClass of classes
    for (const sub of findClasses) {
      console.log("pushed new");
      sub?.teachersOfClass?.push(teacher?._id);
      await sub.save({ validateBeforeSave: false });
    }
  } else {
    console.log("classNames not change");
  }

  // ===============================================================end old classesTaught=====================================================

  if (subject && changeToUpperCase(subject) === existingTeacher?.subject) {
    // if subject name not changed
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        fullName,
        age,
        email,
        phone,
        address,
        DOB,
        status,
        joiningDate,
        leavingDate,
        sallary,
        gender: gender && changeToUpperCase(gender),
        bloodGroup: bloodGroup && bloodGroup.toUpperCase(),
        subject: subject && changeToUpperCase(subject),
      },
      { new: true },
      { validateBeforeSave: false }
    );

    // ==================================update subject========================================
    // update subject/teachers array when user subject is not changed
    const isTeacherInSubjectTeachersArray = await Subject.findOne({
      teachers: { $in: req.params?.id },
    });
    if (isTeacherInSubjectTeachersArray === null) {
      const subjectExists = await Subject.findOne({
        subjectName: changeToUpperCase(subject),
      });
      subjectExists?.teachers?.push(existingTeacher?._id);
      await subjectExists.save({ validateBeforeSave: false });
      console.log("save");
    }
    // ====================================update subject end =======================================

    console.log(" sub name not changed and class also");

    return res
      .status(200)
      .json(new ApiResponse(200, teacher, "Teacher updated successfully"));
  } else {
    console.log(" sub name changed and class aslo");

    // if subject name  change and class
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        fullName,
        age,
        email,
        phone,
        address,
        DOB,
        status,
        joiningDate,
        leavingDate,
        sallary,
        gender: gender && changeToUpperCase(gender),
        bloodGroup: bloodGroup?.toUpperCase(),
        subject: subject && changeToUpperCase(subject),
      },
      { new: true },
      { validateBeforeSave: false }
    );

    // ====================================update subject==============================================
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
    // ================================update subject ends======================================================

    return res
      .status(200)
      .json(new ApiResponse(200, teacher, "Teacher updated successfully"));
  }
});

// if deleted the teacher aslo remove deleted teacher from subject teachers array and class ClassTeacherId
const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    throw new ApiError(400, "Teacher not found !");
  }

  await Teacher.findByIdAndDelete(req.params?.id);

  // remove  from subjects/teachers
  const subject = await Subject.findOne({ teachers: req.params?.id });
  if (subject?.teachers?.length !== 0) {
    const removeSubject = (subject.teachers = subject?.teachers?.filter(
      (id) => id.toString() !== req.params?.id.toString()
    ));
    if (removeSubject) {
      await subject.save({ validateBeforeSave: false });
      console.log("done deleted");
    }
  }

  // remove from classes/ClassteacherId
  const classes = await Class.findOne({ classTeacherID: req.params?.id });
  if (classes) {
    if (classes?.classTeacherID !== null) {
      classes.classTeacherID = null;
      await classes.save({ validateBeforeSave: false });
      console.log("done null");
    }
  }

  // remove from classes/teachersOfClass if its is present
  const classes2 = await Class.find({ teachersOfClass: req.params?.id });
  if (classes2?.length !== 0) {
    for (const cls of classes2) {
      cls?.teachersOfClass?.pull(req.params?.id);
      await cls.save({ validateBeforeSave: false });
      console.log("done deleted teacherOfCLASS");
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Teacher deleted successfully"));
});


// get all atendances of class     CHANGES MADE ❓✏✏🖊
const getAllAttendacesOfClass = asyncHandler(async(req, res)=>{
  const { className } = req.body;
  const upperClass = className?.toUpperCase() 
  
    const findclass = await Attendance.find({ AttClass: upperClass});  
    if (findclass === null) {
      throw new ApiError(404, "Attendances not found for class " + className);
    }
  
    return res.status(200).json(new ApiResponse(200, findclass, "class"));

})



// =======================================TEACHER CONTROLLERS --ADMIN == END =================================================








// =======================================CLASS CONTROLLERS --ADMIN == START =================================================

//  all-classes
const allClasses = asyncHandler(async (req, res) => {
  const findclass = await Class.find({})
    .select("-students -teachersOfClass -subjects")
    .populate({
      path: "classTeacherID",
      select: "fullName",
    });

  if (!findclass) {
    throw new ApiError(400, "No Classes found !");
  }

  return res.status(200).json(new ApiResponse(200, findclass, "class"));
});

// add-classes --admin
const addClass = asyncHandler(async (req, res) => {
  const { className, email, fullName, subjects } = req.body;

  const spl = subjects && subjects?.split(",");

  if (spl?.length < 3) {
    if (!subjects?.match(",")) {
      throw new ApiError(
        400,
        "subjects must ends with trailing commas ex: subject1, subject2 !"
      );
    }
  }

  if ([className, subjects].some((fields) => fields?.trim() === "")) {
    throw new ApiError(400, "all feilds are required !");
  }

  // if initaily class teacher is not created yet
  const findteacher = await Teacher.findOne({
    email: email,
    fullName: fullName,
  });

  if (email && fullName !== "") {
    if (!findteacher) {
      throw new ApiError(400, "teacher with email/fullName not found");
    }
    const teacherExist = await Class.findOne({
      classTeacherID: findteacher?._id,
    });

    if (teacherExist) {
      throw new ApiError(
        400,
        `Class teacher already assigned to ${teacherExist?.className}`
      );
    }
  }

  const classExist = await Class.findOne({
    className: className?.toUpperCase(),
  });

  const firstlattertoUpperCaseSubjects = spl?.map((sub) =>
    changeToUpperCase(sub)
  );
  const findSubjects = await Subject.find({
    subjectName: { $in: firstlattertoUpperCaseSubjects },
  });

  // map over find subjects
  const existingSubjects = findSubjects?.map((sub) => sub?.subjectName);
  // check if user provides subjects/subject are present in existingSubjects
  const nonExistingSubjects = firstlattertoUpperCaseSubjects?.filter(
    (sub) => !existingSubjects.includes(sub)
  );

  if (nonExistingSubjects?.length > 0) {
    throw new ApiError(
      400,
      `Subjects/subject not found: ${nonExistingSubjects?.join(", ")}`
    );
  }

  if (classExist) {
    throw new ApiError(400, "ClassName already exist");
  }

  const classData = await Class.create({
    className: className?.toUpperCase(),
    classTeacherID: findteacher?._id || null,
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
      select: "email fullName",
    })
    .populate({
      path: "students",
      select: "fullName gender",
    })
    .populate({
      path: "teachersOfClass",
      select: "fullName subject gender",
    })
    .populate({
      path: "subjects",
      select: "subjectName",
    });

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

  if ([className].some((fields) => fields?.trim() === "")) {
    throw new ApiError(400, "all feilds are required !");
  }
  if (subjects?.length === 0) {
    throw new ApiError(400, "subjects are required !");
  }
  const findteacher = await Teacher.findOne({
    email: email,
    fullName: fullName,
  });

  if (email && fullName !== "") {
    if (!findteacher) {
      throw new ApiError(400, "teacher with email/fullName not found");
    }
  }

  const classExist = await Class.findById({
    _id: req.params?.id,
  });
  const allClass = await Class.find({});
  if (!classExist) {
    throw new ApiError(400, `${className} not found !`);
  }
  if (allClass?.includes(className)) {
    throw new ApiError(400, "className already exist !");
  }

  if (email && fullName !== "") {
    if (classExist?.classTeacherID === null) {
      const teacherExist = await Class.findOne({
        classTeacherID: findteacher?._id,
      });

      if (teacherExist) {
        throw new ApiError(
          400,
          `Class teacher already assigned to another class ${teacherExist?.className}`
        );
      }
    }
  }

  const firstlattertoUpperCaseSubjects = subjects?.map((sub) =>
    changeToUpperCase(sub)
  );
  const findSubjects = await Subject.find({
    subjectName: { $in: firstlattertoUpperCaseSubjects },
  });
  // map over find subjects
  const existingSubjects = findSubjects?.map((sub) => sub?.subjectName);
  // check if user provides subjects/subject are present in existingSubjects
  const nonExistingSubjects = firstlattertoUpperCaseSubjects?.filter(
    (sub) => !existingSubjects?.includes(sub)
  );

  if (nonExistingSubjects?.length > 0) {
    throw new ApiError(
      400,
      `Subjects/subject not found: ${nonExistingSubjects?.join(", ")}`
    );
  }

  if (subjects?.length == 0) {
    throw new ApiError(400, "subjects are required !");
  }

  if (classExist) {
    const classData = await Class.findByIdAndUpdate(
      req.params?.id,
      {
        className: className?.toUpperCase(),
        classTeacherID: findteacher?._id || null,
        subjects: findSubjects?.map((sub) => sub?._id),
        teachersOfClass: teachersOfClass,
      },
      { new: true },
      { validateBeforeSave: false }
    );

    if (!classData) {
      throw new ApiError(400, "Class not updated");
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
  const classId = req.params?.id;

  if (!classer) {
    throw new ApiError(404, "class not found !");
  }
  // remove that class id from classes of subjects
  const removeClassIdFromSubjects = await Subject.find({
    classes: req.params?.id,
  });

  for (const cls of removeClassIdFromSubjects) {
    cls?.classes?.pull(req.params?.id);
    await cls.save({ validateBeforeSave: false });
    console.log("save subject");
  }

  // // remove deleted className from students className 
  const students = await Student.find({ className: classId });

  for (const student of students) {
    student.className = null;
    await student.save({ validateBeforeSave: false });
    console.log("Saved student");
  }

  // remove  deleted class classTeachers 
  const teachersOfClass = await Teacher.find();
  teachersOfClass?.forEach(async (cls) => {
    if (cls?.classesTaught?.some((ids) => ids?._id?.toString() === classId)) {
      await cls?.updateOne(
        { $pull: { classesTaught: classId } },
        { validateBeforeSave: false }
      );
      console.log("Saved teacher");
    }
  });

  return res.status(200).json(new ApiResponse(200, {}, "deleted successfully"));
});


// =======================================CLASS CONTROLLERS --ADMIN == END =================================================






// =======================================SUBJECT CONTROLLERS --ADMIN == START =================================================

// all subjects
const allSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find().select(
    "-teachers -classes -curriculum"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, subjects, "subjects fetched"));
});

// get single subject
const singleSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params?.id)
    .select("-curriculum")
    .populate({
      path: "teachers",
      select: "fullName gender subject",
    })
    .populate({
      path: "classes",
      select: "className",
    });

  if (!subject) {
    throw new ApiError(404, "subject not found !");
  }

  return res.status(200).json(new ApiResponse(200, subject, "subject fetched"));
});

// add subjects
const addSubject = asyncHandler(async (req, res) => {
  // remeber teachers and classes are not required
  // it will
  const { subjectName, teachers, classes, curriculum } = req.body;

  const subjects = await Subject.findOne({
    subjectName: subjectName && changeToUpperCase(subjectName),
  });

  if (subjects) {
    throw new ApiError(400, `${subjectName} subject already exists`);
  }

  const subject = await Subject.create({
    subjectName: subjectName && changeToUpperCase(subjectName),
    teachers,
    classes,
    curriculum,
  });

  if (subject) {
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          subject,
          `${subjectName} Subject added successfully`
        )
      );
  }
});

// remove subject
const removeSubject = asyncHandler(async (req, res) => {
  const findClassesforSubject = await Class.find({
    subjects: req.params?.id,
  });

  if (findClassesforSubject?.length > 0) {
    console.log("okay subject found in some classes");
    for (const sub of findClassesforSubject) {
      sub.subjects = sub?.subjects?.filter(
        (id) => id.toString() !== req.params?.id.toString()
      );
      await sub.save();
    }
  }
  console.log("okay subject not found in classes");

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
  const { curriculumClass, year, description, documentationLink, keyTopics } =
    req.body;

  const subject = await Subject.findById(req.params?.id);
  if (!subject) {
    throw new ApiError(404, "subject not found !");
  }
  const findClass = await Class.findOne({
    className: curriculumClass?.toUpperCase(),
  });

  if (!findClass) {
    throw new ApiError(404, "class not found or invalid className ! ");
  }

  for (const curiculum of subject?.curriculum) {
    if (
      curriculumClass &&
      curriculumClass?.toUpperCase() === curiculum?.curriculumClass
    ) {
      throw new ApiError(
        404,
        `curriculum of ${curriculumClass} already exists !`
      );
    }
  }

  const pushCurriculum = subject?.curriculum?.push({
    curriculumClass: curriculumClass?.toUpperCase(),
    year,
    description,
    documentationLink,
    keyTopics,
  });
  await subject.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subject,
        `${curriculumClass} Curriculum added successfully`
      )
    );
});

// single academic record of student
const singleCurriculumRecord = asyncHandler(async (req, res) => {
  const subject = await Subject.find({});

  if (!subject) {
    throw new ApiError(404, "Subjects not found!");
  }
  // get all subjects academic records
  const findCurriculum = subject.map((val) => val?.curriculum);
  // extract your record matching the params id
  const findId = findCurriculum.map((val) =>
    val?.filter((ids) => ids?._id?.toString() === req.params?.id)
  );
  // filter out only actual record remove empty arrays
  const filterActualRecord = findId?.filter((val) => val?.length !== 0);

  if (!filterActualRecord) {
    throw new ApiError(404, "record not found !");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, filterActualRecord?.[0], "Curriculum record fetched")
    );
});

//update curriculum of a subject
const updateCurriculumSubject = asyncHandler(async (req, res) => {
  const { curriculumClass, year, description, documentationLink, keyTopics } =
    req.body;
  const subject = await Subject.find({});

  if (!subject) {
    throw new ApiError(404, "Students not found!");
  }
  const classer = await Class.findOne({
    className: curriculumClass?.toUpperCase(),
  });

  if (!classer) {
    throw new ApiError(404, "className not found ! or invalid className");
  }

  // get all curriculums
  const findCurriculum = subject.map((val) => val?.curriculum);

  // find params id in curriculums
  const findId = findCurriculum.map((val) =>
    val?.filter((ids) => ids?._id?.toString() === req.params?.id)
  );
  // remove empty arrays
  const filterActualRecord = findId?.filter((val) => val?.length !== 0);
  // got the actual record
  const pickARecord = filterActualRecord?.[0]?.[0];

  if (!pickARecord) {
    throw new ApiError(404, "Record not found!");
  }

  // // Update the properties with the new values
  pickARecord.year = year || pickARecord.year;
  pickARecord.curriculumClass =
    curriculumClass?.toUpperCase() || pickARecord.curriculumClass;
  pickARecord.description = description || pickARecord.description;
  pickARecord.documentationLink = documentationLink || pickARecord.exam;
  pickARecord.keyTopics = keyTopics || pickARecord.grade;

  console.log("done");

  // Save the updated record using findByIdAndUpdate
  const updatedRecord = await Subject.findOneAndUpdate(
    { "curriculum._id": req.params?.id },
    { $set: { "curriculum.$": pickARecord } },
    { new: true }
  );

  if (updatedRecord) {
    return res
      .status(201)
      .json(
        new ApiResponse(201, updatedRecord, "Curriculum updated successfully")
      );
  } else {
    throw new ApiError(500, "Failed to update curriculum");
  }
});

// delete curriculum of a subject
const deleteCurriculumSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.find({});

  if (!subject) {
    throw new ApiError(404, "Students not found!");
  }

  // get all curriculums
  const findCurriculum = subject.map((val) => val?.curriculum);

  // find params id in curriculums
  const findId = findCurriculum.map((val) =>
    val?.filter((ids) => ids?._id?.toString() === req.params?.id)
  );
  // remove empty arrays
  const filterActualRecord = findId?.filter((val) => val?.length !== 0);
  // got the actual record
  const pickARecord = filterActualRecord?.[0]?.[0];

  if (!pickARecord) {
    throw new ApiError(404, "Record not found!");
  }

  // Remove the specific curriculum record using update and $pull
  const removeRecord = await Subject.findOneAndUpdate(
    { "curriculum._id": req.params?.id },
    { $pull: { curriculum: { _id: req.params?.id } } },
    { new: true }
  );

  if (removeRecord) {
    return res
      .status(201)
      .json(new ApiResponse(201, {}, `Curriculum record deleted successfuly`));
  }
});

// all curruiculms class subjec --- new ✨
const allCurriculumsClassSubjects = asyncHandler(async (req, res) => {
  const curriculums = await Curriculum.find({});
  if (!curriculums) {
    throw new ApiError(404, "Curriculums not found !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, curriculums, "curriculums fetched"));
});

// add curriculum for all subjects  for each class in one shot --- new ✨
const addCurriculumSingleClassSubjects = asyncHandler(async (req, res) => {
  const { curriculumClass, year, description,month, curriculumSubjects, documentationLink } =
    req.body;

  const findClass = await Class.findOne({
    className: curriculumClass?.toUpperCase(),
  });

  if (!findClass) {
    throw new ApiError(404, "class not found or invalid className ! ");
  }

  const allCurriculums = await Curriculum.findOne({curriculumClass: curriculumClass?.toUpperCase()});

  if (allCurriculums) {
    throw new ApiError(404, `curriculum of ${curriculumClass} already exists !`);
  }
  
  const curSubjects = curriculumSubjects
  const curriculumSubjectsString = curSubjects?.split(",")
  .map((sub) => changeToUpperCase(sub))
  .join(", ")
  .trim();

  if(curriculumSubjectsString === 'undefined'){
    throw new ApiError(404, `curriculum Subjects are required !`);
  }

  
  const createCurriculum = await Curriculum.create({
    curriculumClass: curriculumClass?.toUpperCase(),
    year,
    month,
    description,
    documentationLink,
    curriculumSubjects: curriculumSubjectsString,
  })


  if(!createCurriculum){
    throw new ApiError(404, `curriculum not created !`);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allSubjects,
        `${curriculumClass} Curriculum added successfully for all subjects`
      )
    );
});

// update curriculum --- new ✨
const updateCurriculumSubjectClass = asyncHandler(async (req, res) => {
  const { curriculumClass, year, description,month, curriculumSubjects, documentationLink } =
    req.body;
  const id  = req.params?.id;

  const allCurriculums = await Curriculum.findOne({_id: id});

  if (!allCurriculums) {
    throw new ApiError(404, `curriculum not found !`);
  }

  const findClass = await Class.findOne({
    className: curriculumClass?.toUpperCase(),
  });

  if (!findClass) {
    throw new ApiError(404, "class not found or invalid className ! ");
  }
  
  const curSubjects = curriculumSubjects
  const curriculumSubjectsString = curSubjects?.split(",")
  .map((sub) => changeToUpperCase(sub))
  .join(", ")
  .trim();

  if(curriculumSubjectsString === 'undefined'){
    throw new ApiError(404, `curriculum Subjects are required !`);
  }

  
  const updateCurriculum = await Curriculum.findOneAndUpdate({_id: id},{
    curriculumClass: curriculumClass?.toUpperCase(),
    year,
    month,
    description,
    documentationLink,
    curriculumSubjects: curriculumSubjectsString,
  })

  const updatedCurriculum = await Curriculum.findById(id)

  if(!updateCurriculum){
    throw new ApiError(404, `curriculum not updated !`);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedCurriculum,
        `Curriculum updated successfully`
      )
    );
});

// single curriculum record of class  --- new ✨
const singleCurriculumSingleClassSubjects = asyncHandler(async (req, res) => {
  const curriculums = await Curriculum.findOne({_id: req.params.id});

  if (!curriculums) {
    throw new ApiError(404, "Curriculums not found!");
  }


  return res
    .status(200)
    .json(
      new ApiResponse(200, curriculums, "Curriculum record fetched")
    );
});

// delete curriculum of a subject --- new ✨
const deleteCurriculumSubjectsClass = asyncHandler(async (req, res) => {
  const id  = req.params?.id;
  const curriculum = await Curriculum.findById(id);

  if (!curriculum) {
    throw new ApiError(404, "curriculum not found!");
  }

  // Remove the specific curriculum record
  const removeRecord = await Curriculum.findOneAndDelete(
    {_id: id}
  );

  if (removeRecord) {
    return res
      .status(201)
      .json(new ApiResponse(201, {}, `Curriculum record deleted successfuly`));
  }
  else{
    throw new ApiError(404, `curriculum not removed !`);
  }

});

// =======================================SUBJECT CONTROLLERS --ADMIN == END =================================================










export {
  //user
  getAllUsers,
  deleteUser,
  updateUserRole,
  singleUser,
  updateUserAvatar,

  // student
  addStudent,
  getAllStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  allAcademicRecordStudent,
  addAcademicRecordStudent,
  updatedStudentAcedamicRecord,
  singleAcademicRecord,
  deleteAcademicRecord,
  updateAvatarStudent,

  // teacher
  addTeacher,
  updateTeacher,
  updateTeacherAvatar,
  getAllTeachers,
  deleteTeacher,
  getTeacherById,
  getAllAttendacesOfClass,
  sendNotification,
  notifySingleTeacher,
  getNotificationById,
  getAllNotifications,
  updateNotification,
  deleteNotification,

  // class
  addClass,
  allClasses,
  updateClass,
  deleteClass,
  singleClass,

  // subject
  addSubject,
  allSubjects,
  singleSubject,
  removeSubject,
  allCurriculumSubject,
  addCurriculumSubject,
  allCurriculumsClassSubjects,
  addCurriculumSingleClassSubjects,
  updateCurriculumSubjectClass,
  singleCurriculumSingleClassSubjects,
  deleteCurriculumSubjectsClass,
  updateCurriculumSubject,
  deleteCurriculumSubject,
  singleCurriculumRecord,
};
