import { Teacher } from "../models/teacher.model.js";
import { Class } from "../models/class.model.js";
import { Assignment } from "../models/assigments.model.js";
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
import sendEmail from "../utils/sendEmail.js";
import { AdminNotify } from "../models/notification.model.js";
import { TeacherNotify } from "../models/notificationSt.model.js";
import { User } from "../models/user.model.js";



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
    select: "fullName email rollNo gender age admissionClass fatherName DOB joiningDate bloodGroup address phone avatar academicHistory",
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

  const UserExists = await User.findOne({
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

  if (UserExists !== null) {
    throw new ApiError(
      400,
      "User with email and fullName already exists in db !"
    );
  } 
  const teacherOfClass = await Class.findOne({ classTeacherID: tr?._id });
  const studentsInClass = teacherOfClass;

  const phoneExists = await Student.findOne({ phone: phone });
  const dOBExists = await Student.findOne({ DOB: DOB });

  if (!teacherOfClass) {
    throw new ApiError(400, "Your'r not yet Class Teacher of any class !");
  }

  if (phone?.length !== 11) {
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
        removeStudent,
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


// take attendance of class by class Teacher
const takeAttendance = asyncHandler(async (req, res) => {
  const attendanceArray = req.body;
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;
  const tr = await Teacher.findOne({ email: email, fullName: fullName });

  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName email",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class!");
  }

  if (!teacherOfClass.students || teacherOfClass.students.length === 0) {
    throw new ApiError(400, "No students found in the class!");
  }

  // Check if attendance for this class has already been taken today
  const existingAttendance = await Attendance.findOne({
    AttClass: teacherOfClass?.className,
    date: {
      $gte: new Date().setHours(0, 0, 0, 0), // Today's date
      $lte: new Date().setHours(23, 59, 59, 999), // End of today
    },
  });

  if (existingAttendance) {
    throw new ApiError(400, "Attendance already been taken today!");
  }

  // Validate each attendance record and create an array of valid records
  const validStatusValues = ["present", "absent"];
  const attendanceRecords = attendanceArray?.map((record) => {
    if (
      !record?.studentID ||
      !record?.studentName ||
      !record?.studentEmail ||
      !record?.status ||
      !validStatusValues.includes(record?.status)
    ) {
      throw new ApiError(400, "Invalid attendance record");
    }

    return {
      studentID: record?.studentID,
      studentName: record?.studentName,
      studentEmail: record?.studentEmail,
      AttClass: teacherOfClass?.className,
      date: new Date(),
      status: record?.status,
      markedBy: tr?.fullName,
    };
  });

  // Save the attendance records to the database
  const data = await Attendance.insertMany(attendanceRecords);
  if (!data) {
    throw new ApiError(400, "Attendance not taken!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, data, "Attendance taken successfully"));
});


// get attendance of today of  class
const getAttendanceOfToday = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;
  const tr = await Teacher.findOne({ email: email, fullName: fullName });

  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class !");
  }

  const todayAttendanceOfClass = await Attendance.find({
    AttClass: teacherOfClass?.className,
    date: {
      $gte: new Date().setHours(0, 0, 0, 0), // Today's date
      $lte: new Date().setHours(23, 59, 59, 999), // End of today
    },
  });

  if (!todayAttendanceOfClass) {
    throw new ApiError(404, "Today Attendance not Takken !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, todayAttendanceOfClass, "Attendance fetched"));
});


// get attendance monthly each student
const getAttendanceOfMonthly = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;
  const tr = await Teacher.findOne({ email: email, fullName: fullName });

  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class !");
  }

  const MonthlyAttendanceOfStudent = await Attendance.find({
    AttClass: teacherOfClass?.className,
    studentID: req.params.id,
    // get this month attendance
    date: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of current month
      $lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), // End of current month
    }

  }).select('studentName status date studentID');

  // get get total present percentage of month
  const AttendacePercentage = MonthlyAttendanceOfStudent?.length
  // get total month days
  const totalDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  // get total attendance percentage monthly
  const presentPercentage = (AttendacePercentage / totalDays) * 100

  // total present out of month
  const totalPresent = MonthlyAttendanceOfStudent?.filter((val)=> val?.status === "present").length
  // total absent out of month
  const totalAbsent = MonthlyAttendanceOfStudent?.filter((val)=> val?.status === "absent").length
  

  if (!MonthlyAttendanceOfStudent) {
    throw new ApiError(404, "Attendances Not Found !");
  }

  const monthlyData = {
    totalDays,
    presentPercentage,
    totalPresent,
    totalAbsent,
    MonthlyAttendanceOfStudent,
  }

  return res
    .status(200)
    .json(new ApiResponse(200, monthlyData, "Attendance fetched"));
});


// get curruculum of  subject of class
const curriculumOfSubjectOfClass = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });

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


// notify student for absenties if greater than 3 days
const notifyAbsenties = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });

  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class !");
  }

  const todayAttendanceOfClass = await Attendance.find({
    AttClass: teacherOfClass?.className,
    date: {
      $gte: new Date().setHours(0, 0, 0, 0), // Today's date
      $lte: new Date().setHours(23, 59, 59, 999), // End of today
    }
  })

  if(!todayAttendanceOfClass){
    throw new ApiError(404, "Today Attendance not Takken !")
  }
  
  const absentStudents = todayAttendanceOfClass?.filter(val=> val?.status === "absent")

  if(!absentStudents){
    throw new ApiError(404, "No absenties found !")
  }

  // send email to absent students
  try {
    for(const absentSt of absentStudents){
      const stName = absentSt?.studentName
      const stEmail = absentSt?.studentEmail
      
      const message = `
      <b>Dear ${stName},</b>
      <p>This is to inform you that you were marked absent in today's class. Please ensure you attend regularly.</p>
      <p></p>
      <p>Sincerely,</p>
      <p><strong>CAMBRIDGE SCHOOL AND COLLEGE SADDA</strong></p>
    `;
    await sendEmail({
      email: stEmail,
      subject: "Attendance Notification",
      message: message,
    });

    }
    return res.status(200).json(new ApiResponse(200, {}, "Emails sent successfully"));
  } catch (error) {
    console.error("Error sending email:", error);
    throw new ApiError(500, "Failed to send email notifications to absent students");
  }
  
})


// give assigments to class of defferent subjects with documentation link must
const giveAssignments = asyncHandler(async (req, res) => { 
  const {subject,dueDate, docLink} = req.body

  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });

  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class !");
  }

  if(!subject || !dueDate || !docLink){
    throw new ApiError(400, "All fields are required !")
  }

  const findSubject = await Subject.findOne({
    subjectName: changeToUpperCase(subject)
  })

  if(!findSubject){
    throw new ApiError(400, "Subject not found !")
  }

  const findAssigment = await Assignment.findOne({
    subject: changeToUpperCase(subject),
    forClass: teacherOfClass?.className,
  })

  if(findAssigment){
    throw new ApiError(400, "Assignment already created !")
  }

  const createAssignment = await Assignment.create({
    subject: changeToUpperCase(subject),
    dueDate: dueDate,
    docLink: docLink,
    forClass: teacherOfClass?.className,
    markedBy: tr?.fullName,
    createdBy: tr?.fullName
  })

  if(!createAssignment){
    throw new ApiError(400, "Assignment not created !")
  }

  return res.status(200).json(new ApiResponse(200, createAssignment, "Assignment created successfully"));

})

// get class created assigments
const allAssignmentsOfClass = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });

  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class !");
  }

  const allAssignments = await Assignment.find({
    forClass: teacherOfClass?.className,
  })

  if(!allAssignments){
    throw new ApiError(404, "No assignments found !")
  }

  return res.status(200).json(new ApiResponse(200, allAssignments, "All assignments fetched"));

})

// get single assigment by id
const getSingleAssignment = asyncHandler(async (req, res) => {
  const id = req.query.id

  const assignment = await Assignment.findById(id)

  if(!assignment){
    throw new ApiError(404, "No assignment found !")
  }

  return res.status(200).json(new ApiResponse(200, assignment, "assignment fetched"));

})

// update asssigment
const updateAssigment = asyncHandler(async (req, res) => {
  const id = req.query.id
  const {subject,dueDate, docLink} = req.body

  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });
  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class !");
  }

  const updatedAssignment = await Assignment.findByIdAndUpdate(
    id,
    {
      $set:{
        subject: changeToUpperCase(subject),
        dueDate: dueDate,
        docLink: docLink
      }
    }
  )
  if(!updatedAssignment){
    throw new ApiError(404, "No assignments found !")
  }

  const findAssigment = await Assignment.findOne({_id: id})
  if(!findAssigment){
    throw new ApiError(404, "No assignment found !")
  }
  return res.status(200).json(new ApiResponse(200, findAssigment, "assignment updated successfully"));

})


// delete asssigment
const deleteAssigment = asyncHandler(async (req, res) => {
  const id = req.query.id

  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });
  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class !");
  }

  const deletedAssignment = await Assignment.findByIdAndDelete({_id: id})

  if(!deletedAssignment){
    throw new ApiError(404, "No assignment found !")
  }

  return res.status(200).json(new ApiResponse(200, deletedAssignment, "assignment deleted successfully"));

})

// get for all teachers notifications
const allTeachersNotifications = asyncHandler(async (req, res) => {
  const getNotifications = await AdminNotify.find()

  if(!getNotifications){
    throw new ApiError(404, "No notifications found !")
  }

  const filterwithoutEmailandFullNameNotifications = getNotifications?.filter(val=> !val?.teacherFullName && !val?.teacherEmail)

  return res.status(200).json(new ApiResponse(200, filterwithoutEmailandFullNameNotifications, "All notifications fetched"));
})

// get personal teacher notifications
const singleTeacherNotifications = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });
  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class !");
  }

  const getNotifications = await AdminNotify.find({
    teacherFullName: fullName,
    teacherEmail: email
  })

  if(!getNotifications){
    throw new ApiError(404, "No notifications found !")
  }

  return res.status(200).json(new ApiResponse(200, getNotifications, "All notifications fetched"));
  
})


// send notification to all students of class
const sendNotificationStudents = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });
  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class !");
  }

  const { title, desc,fileLink } = req.body;

  if (!title || !desc) {
    throw new ApiError(400, "All fields are required !");
  }

  //convert to uppercase each word first character
  const spl = title?.split(" ");
  const newTitle = spl?.map((w) => w?.[0].toUpperCase() + w?.slice(1, w?.length))?.join(" ")

  const createNotification = await TeacherNotify.create({
   title: newTitle,
   desc,
   fileLink,
   forClass: teacherOfClass?.className,
 })

  if(!createNotification){
    throw new ApiError(400, "failed to send notification !")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createNotification, "notification sent successfully !"));
})

// // send notification to single student of class
const notifySingleStudent = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });
  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName email",
    });

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class !");
  }

  const { title, desc,fileLink,studentFullName,studentEmail } = req.body;

  if (!title || !desc || !studentFullName || !studentEmail) {
    throw new ApiError(400, "All fields are required !");
  }
  const findStudentWithEmailAndFullName = teacherOfClass?.students?.find(val=> val?.fullName === studentFullName?.trim() && val?.email?.trim() === studentEmail)

  if(findStudentWithEmailAndFullName === undefined){
    throw new ApiError(400, "student with email or Fullname not found !")
  }
  //convert to uppercase each word first character
  const spl = title?.split(" ");
  const newTitle = spl?.map((w) => w?.[0].toUpperCase() + w?.slice(1, w?.length))?.join(" ")

  const createNotification = await TeacherNotify.create({
   title: newTitle,
   desc,
   fileLink,
   studentFullName: studentFullName?.trim(),
   studentEmail: studentEmail?.trim(),
   forClass: teacherOfClass?.className,
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
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });
  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class !");
  }

  const notifications = await TeacherNotify.find({forClass: teacherOfClass?.className})

  return res
    .status(200)
    .json(new ApiResponse(200, notifications, "notifications fetched successfully !"));
})


// get notification by id
const getNotificationById = asyncHandler(async (req, res) => {
  const notification = await TeacherNotify.findById(req.params?.id)

  if(!notification){
    throw new ApiError(404, "notification not found !")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notification, "notification fetched successfully !"));

})


// update notification
const updateNotification = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });
  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")
    .populate({
      path: "students",
      select: "fullName email",
    })

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class !");
  }

  const { title, desc,fileLink ,studentFullName,studentEmail} = req.body;

  if (!title || !desc) {
    throw new ApiError(400, "All fields are required !");
  }
  // if email and fullname are not empty strings then
  if(studentEmail !== "" && studentFullName !== ""){
    console.log("done above");
    const findStudentWithEmailAndFullName = teacherOfClass?.students?.find(val=> val?.fullName === studentFullName?.trim() && val?.email?.trim() === studentEmail)

    if(findStudentWithEmailAndFullName === undefined){
      throw new ApiError(400, "student with email or Fullname not found !")
    }

    const updateNotification = await TeacherNotify.findByIdAndUpdate(
      req.params?.id,
      {
        $set: {
          title,
          desc,
          fileLink,
          studentFullName,
          studentEmail
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
  const updateNotification = await TeacherNotify.findByIdAndUpdate(
    req.params?.id,
    {
      $set: {
        title,
        desc,
        fileLink
      },
    },
    { new: true }
  );
  console.log("done below");

  if (!updateNotification) {
    throw new ApiError(404, "failed to update notification !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateNotification, "notification updated successfully !"));
})

// delete notification
const deleteNotification = asyncHandler(async (req, res) => {
  const fullName = req?.user?.fullName;
  const email = req?.user?.email;

  const tr = await Teacher.findOne({ email: email, fullName: fullName });
  const teacherOfClass = await Class.findOne({
    classTeacherID: tr?._id,
  })
    .select("-classTeacherID -teachersOfClass -subjects")

  if (!teacherOfClass) {
    throw new ApiError(400, "You're not yet the Class Teacher of any class !");
  }

  const notification = await TeacherNotify.findByIdAndDelete(req.params?.id)

  if(!notification){
    throw new ApiError(404, "notification not found !")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notification, "notification deleted successfully !"));
})



export {
  
  // teacher routes
  getLogedInTeacherDetails,
  allStudentsOfSpecificClass,
  getStudentDetail,
  addStudentsToClass,
  updateStudentsOfClass,
  updateStudentAvatar,
  deleteStudentFromClass,
  notifyAbsenties, 
  takeAttendance,
  getAttendanceOfToday,
  giveAssignments,
  allAssignmentsOfClass,
  getSingleAssignment,
  updateAssigment,
  deleteAssigment,
  allTeachersNotifications,
  singleTeacherNotifications,
  sendNotificationStudents,
  notifySingleStudent,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
  getAttendanceOfMonthly,

  allTeachersOfSpecificClass,

  allSubjectsOfClass,
  curriculumOfSubjectOfClass
};
