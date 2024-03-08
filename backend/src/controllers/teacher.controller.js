import { Teacher } from "../models/teacher.model.js";
import { Class } from "../models/class.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  RemovecloudinaryExistingImg,
  cloudinaryUploadImg,
} from "../utils/cloudinary.js";
import { Subject } from "../models/subject.model.js";
import { changeToUpperCase } from "../utils/toUpperCase.js";
import { extractId } from "../utils/extractCloudinaryId.js";
import { Student } from "../models/student.model.js";
import { Attendance } from "../models/attendance.mode.js";



// get loged in teacher details / by its fullName and email
const getLogedInTeacherDetails = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({
    email: email,
    fullName: fullName,
  }).populate({
    path: "classesTaught",
    select: "className",
  });

  if (!tr) {
    throw new ApiError(400, "You'r not yet added as a teacher  contact admin !");
  }
  const teacherOfClass = await Class.findOne({ classTeacherID: tr?._id })
    .select("-students -teachersOfClass -subjects")
    .populate({
      path: "classTeacherID",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "Your'r not yet Class Teacher of any class !");
  }

  const classNAME = teacherOfClass? teacherOfClass.className : ""
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        [tr,classNAME],
        "loged in Teacher details"
      )
    );
});

// all students of specific classTeacher
const allStudentsOfSpecificClass = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });

  if (!tr) {
    throw new ApiError(400, "Teacher not found !");
  }

  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  }).populate({
    path: "students",
    select: "fullName email rollNo gender",
  });

  if (!teacherOfClass) {
    throw new ApiError(400, "Your'r not yet Class Teacher of any class !");
  }

  const allStudents = [teacherOfClass?.students , teacherOfClass?.className];

  return res
    .status(200)
    .json(new ApiResponse(200, allStudents, "loged in Teacher details"));
});


// get single student detail
const getStudentDetail = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });

  if (!tr) {
    throw new ApiError(400, "Teacher not found !");
  }

  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  }).populate("students");

  if (!teacherOfClass) {
    throw new ApiError(400, "Your'r not yet Class Teacher of any class !");
  }

  const allStudents = teacherOfClass?.students;

  const student = allStudents?.find(
    (student) => student?._id?.toString() === req.params?.id
  );

  if (!student) {
    throw new ApiError(400, `Student not found in class !`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, student, "student details"));
});


// add students to class by class teacher only
const addStudentsToClass = asyncHandler(async (req, res) => {
  const fullNameOfLogedInTeacher = req?.user?.fullName;
  const emailOfLogedInTeacher = req?.user?.email;

  const tr = await Teacher.findOne({
    fullName: fullNameOfLogedInTeacher,
    email: emailOfLogedInTeacher,
  });

  if (!tr) {
    throw new ApiError(400, "Access Denied No Teacher Record Found  !");
  }

  const {
    firstName,
    fullName,
    admissionClass,
    rollNo,
    age,
    fatherName,
    monthlyFee,
    securityFee,
    labFee,
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
    $or: [
      {email: email},
      {fullName: fullName}
    ]
  });

  if (StudentExists !== null) {
    throw new ApiError(
      400,
      "Student with email and fullName already exists in db !"
    );
  } 
  const teacherOfClass = await Class.findOne({ classTeacherID: tr?._id });
  const studentsInClass = teacherOfClass;

  const phoneExists = await Student.findOne({ phone: phone });
  const dOBExists = await Student.findOne({ DOB: DOB });

  if (!teacherOfClass) {
    throw new ApiError(400, "Your'r not yet Class Teacher of any class !");
  }

  if (phone?.length > 11) {
    throw new ApiError(400, "Invalid phone number !");
  } 
  if (phoneExists) {
    throw new ApiError(400, "Phone number already exists !");
  } 
  if (dOBExists) {
    throw new ApiError(400, "Date of birth already exists !");
  }

  // if class  same roll no
  if (studentsInClass?.students?.length !== 0) {
    const classStudents = studentsInClass?.students;
    const studentsfindId = await Student.find({ _id: classStudents });
    const mapoverStudents = studentsfindId?.map((student) => student?.rollNo);
    const isrollNoAlreadyAsignedInThatClass = mapoverStudents?.find(
      (number) => number == rollNo
    );

    if (isrollNoAlreadyAsignedInThatClass) {
      throw new ApiError(
        400,
        `Roll No already assigned to another student in ${teacherOfClass?.className}  !`
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
    className: studentsInClass?._id,
    email,
    monthlyFee,
    securityFee,
    labFee,
    phone,
    address,
    gender: gender[0].toUpperCase() + gender.substr(1, gender.length),
    DOB,
    avatar: avatar.url,
    joiningDate,
    bloodGroup: bloodGroup.toUpperCase(),
  });

  studentsInClass?.students?.push(student?._id);
  console.log("done");
  await studentsInClass.save({ validateBeforeSave: false });
  console.log("done saved");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        student,
        `student added to ${studentsInClass?.className}`
      )
    );
});


// update class students by class teacher only
const updateStudentsOfClass = asyncHandler(async (req, res) => {
  const fullNameOfLogedInTeacher = req?.user?.fullName;
  const emailOfLogedInTeacher = req?.user?.email;

  const tr = await Teacher.findOne({
    fullName: fullNameOfLogedInTeacher,
    email: emailOfLogedInTeacher,
  });

  if (!tr) {
    throw new ApiError(400, "Access Denied No Teacher Record Found  !");
  }

  const {
    firstName,
    fullName,
    admissionClass,
    rollNo,
    age,
    fatherName,
    gender,
    DOB,
    joiningDate,
    bloodGroup,
    monthlyFee,
    securityFee,
    labFee,
    email,
    address,
    phone,
  } = req.body;

  const teacherOfClass = await Class.findOne({ classTeacherID: tr?._id })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "Your'r not yet Class Teacher of any class !");
  }

  const allStudents = teacherOfClass?.students;

  const student = allStudents?.find(
    (student) => student?._id?.toString() === req.params?.id
  );

  if (!student) {
    throw new ApiError(400, `Student not found in class !`);
  }


  const updatedStudent = await Student.findByIdAndUpdate(
    req.params?.id,
      {
        fullName: fullName,
        firstName: firstName,
        rollNo: rollNo,
        age: age,
        admissionClass: admissionClass,
        fatherName: fatherName,
        email: email,
        monthlyFee: monthlyFee,
        securityFee: securityFee,
        labFee: labFee,
        phone: phone,
        address: address,
        DOB: DOB,
        gender: gender && gender[0].toUpperCase() + gender.substr(1),
        bloodGroup: bloodGroup && bloodGroup.toUpperCase(),
        joiningDate: joiningDate,
        className: teacherOfClass?._id,
      },
    { new: true},{validateBeforeSave: false} // To return the updated document
  );

  if (!updatedStudent) {
    throw new ApiError(400, `Student not updated !`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedStudent, "Student Updated Successfully !"));



});


// delete student from class by class teacher only
const deleteStudentFromClass = asyncHandler(async (req, res) => {
  const fullNameOfLogedInTeacher = req?.user?.fullName;
  const emailOfLogedInTeacher = req?.user?.email;

  const tr = await Teacher.findOne({
    fullName: fullNameOfLogedInTeacher,
    email: emailOfLogedInTeacher,
  });

  if (!tr) {
    throw new ApiError(400, "Access Denied No Teacher Record Found  !");
  }

  const teacherOfClass = await Class.findOne({ classTeacherID: tr?._id })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "Your'r not yet Class Teacher of any class !");
  }

  const allStudents = teacherOfClass?.students;

  const student = allStudents?.find(
    (student) => student?._id?.toString() === req.params?.id
  );

  if (!student) {
    throw new ApiError(400, `Student not found in class !`);
  }

  const removeStudent = await Student.findOneAndDelete({ _id: student?._id });
 // Remove the student ID from the array in the Class collection
  const removeFromArrayofStudents = await Class.updateOne(
    { _id: teacherOfClass._id }, // class id
    { $pull: { students: student?._id } }
  );

  if (!removeStudent || !removeFromArrayofStudents) {
    throw new ApiError(400, `Student not deleted !`);
  }
  const avataroldPublicId = extractId(removeStudent?.avatar);

  if (avataroldPublicId) {
    const remOldAvatar = await RemovecloudinaryExistingImg(avataroldPublicId);
    console.log("done deleted");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        `Student deleted from ${teacherOfClass?.className}  !`
      )
    );
});


// update student avatar
const updateStudentAvatar = asyncHandler(async (req, res) => {
  const fullNameOfLogedInTeacher = req?.user?.fullName;
  const emailOfLogedInTeacher = req?.user?.email;

  const tr = await Teacher.findOne({
    fullName: fullNameOfLogedInTeacher,
    email: emailOfLogedInTeacher,
  });

  if (!tr) {
    throw new ApiError(400, "Access Denied No Teacher Record Found  !");
  }

  const { avatar } = req.body;

  const teacherOfClass = await Class.findOne({ classTeacherID: tr?._id })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "Your'r not yet Class Teacher of any class !");
  }

  const allStudents = teacherOfClass?.students;

  const std = allStudents?.find(
    (student) => student?._id?.toString() === req.params?.id
  );

  if (!std) {
    throw new ApiError(400, `Student not found in class !`);
  }
  const getAvatarUrl = await Student.findOne({ _id: std?._id });

  const avataroldPublicId = extractId(getAvatarUrl?.avatar);

  if (avataroldPublicId) {
    const remOldAvatar = await RemovecloudinaryExistingImg(avataroldPublicId);
    console.log("done deleted");
  }

  let avatarLocalPath = req.file ? req.file?.path : null;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Student image is required !");
  }

  const avatarNew = await cloudinaryUploadImg(avatarLocalPath);

  if (!avatarNew?.url) {
    throw new ApiError(400, "Student image is required !");
  }

  const student = await Student.findOneAndUpdate(
    { _id: req.params?.id },
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


// all teachers of specific class
const allTeachersOfSpecificClass = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });

  if (!tr) {
    throw new ApiError(400, "Teacher not found !");
  }

  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  }).populate({
    path: "teachersOfClass",
    select: "fullName subject",
  });

  if (!teacherOfClass) {
    throw new ApiError(400, "Your'r not yet Class Teacher of any class !");
  }

  const allTeachers = teacherOfClass?.teachersOfClass;

  return res
    .status(200)
    .json(new ApiResponse(200, allTeachers, `Teacher fetched of ${teacherOfClass?.className}`));
});


// get all subjects of class
const allSubjectsOfClass = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });

  if (!tr) {
    throw new ApiError(400, "Teacher not found !");
  }

  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  }).populate({
    path: "subjects",
    select: "subjectName",
  })

  if (!teacherOfClass) {
    throw new ApiError(400, "Your'r not yet Class Teacher of any class !");
  }

  const allSubjects = teacherOfClass?.subjects;

  // Filter curriculum for the teacher's class
  const findMyClassCurriculum = await Subject.find({
    _id: allSubjects,
  })

  const mapoverCurriculum = findMyClassCurriculum?.map((cur) =>  cur?.curriculum?.filter((cls)=> cls?.curriculumClass === teacherOfClass?.className ))

  const data = {
    subjects: allSubjects,
    cur: mapoverCurriculum
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "loged in Teacher details"));
});



// get curruculum of  subject of class
const curriculumOfSubjectOfClass = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });

  if (!tr) {
    throw new ApiError(400, "Teacher not found !");
  }

  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  }).populate({
    path: "subjects",
    select: "subjectName",
  })

  if (!teacherOfClass) {
    throw new ApiError(400, "Your'r not yet Class Teacher of any class !");
  }

  const allSubjects = teacherOfClass?.subjects;

  // Filter curriculum for the teacher's class
  const findMyClassCurriculum = await Subject.find({
    _id: allSubjects,
  })

  const mapoverCurriculum = findMyClassCurriculum?.map((cur) =>  cur?.curriculum?.filter((cls)=> cls?.curriculumClass === teacherOfClass?.className ))

  const filterbyId = mapoverCurriculum?.map(val => val?.filter(ids=> ids))
  //filter those who is not null
  const filterActive = filterbyId?.filter(val=> val?.length !== 0)
  const  finalCur = filterActive?.map((val)=> val[0])

  if(!filterActive){
    throw new ApiError(404, "curriculum not found !")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, finalCur, "curiculum"));
});


// to be continued.....
// take attendance of class by class Teacher
const takeAttendance = asyncHandler(async (req, res) => {
  const attendanceArray = req.body;

  const fullName = req?.user?.fullName;
  const email = req?.user?.email;
  const tr = await Teacher.findOne({ email: email, fullName: fullName });

  if (!tr) {
    throw new ApiError(400, "Teacher not found!");
  }

  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class!");
  }

  if (!teacherOfClass.students || teacherOfClass.students.length === 0) {
    throw new ApiError(400, "No students found in the class!");
  }

  // Validate each attendance record and create an array of valid records
  const validStatusValues = ["present", "absent"];
  const attendanceRecords = attendanceArray?.map((record) => {
    if (
      !record?.studentID ||
      !record?.studentName ||
      !record?.status ||
      !validStatusValues.includes(record?.status)
    ) {
      throw new ApiError(400, "Invalid attendance record");
    }

    return {
      studentID: record?.studentID,
      studentName: record?.studentName,
      AttClass: teacherOfClass?.className,
      date: new Date(),
      status: record?.status,
      markedBy: tr?.fullName,
    };
  });

  // Save the attendance records to the database
  await Attendance.insertMany(attendanceRecords);

  res.status(200).json(new ApiResponse(200, {}, "Attendance taken successfully"));
});





export {
  
  // teacher routes
  getLogedInTeacherDetails,
  allStudentsOfSpecificClass,
  getStudentDetail,
  addStudentsToClass,
  updateStudentsOfClass,
  updateStudentAvatar,
  deleteStudentFromClass,
  takeAttendance,

  allTeachersOfSpecificClass,

  allSubjectsOfClass,
  curriculumOfSubjectOfClass
};
