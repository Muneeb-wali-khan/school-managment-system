import { Teacher } from "../models/teacher.model.js";
import { Class } from "../models/class.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinaryUploadImg } from "../utils/cloudinary.js";
import { Subject } from "../models/subject.model.js";
import { changeToUpperCase } from "../utils/toUpperCase.js";
import { Student } from "../models/student.model.js";

const getAllTeachers = asyncHandler(async (req, res, next) => {
  const teachers = await Teacher.find();

  return res
    .status(200)
    .json(new ApiResponse(200, teachers, "Teachers fetched successfully"));
});

// teacher by id
const getTeacherById = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params?.id)
  .populate({
    path: "classesTaught",
    select: "className"
  });

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

  const spl = classesTaught?.split(",");

  if (spl?.length < 3) {
    if (!classesTaught?.match(",")) {
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
    throw new ApiError(
      400,
      `Class/className not found: ${nonExistingClasses.join(", ")}`
    );
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
    gender: changeToUpperCase(gender),
    DOB,
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

  const spl = classesTaught?.split(",");

  if (spl?.length < 3) {
    if (!classesTaught?.match(",")) {
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
    throw new ApiError(
      400,
      `Class/className not found: ${nonExistingClasses.join(", ")}`
    );
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
        gender: gender && changeToUpperCase(gender),
        DOB,
        joiningDate,
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
        gender: gender && changeToUpperCase(gender),
        DOB,
        joiningDate,
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




// ================================ Teacher Routes =====================================================================



// get loged in teacher details / by its fullName and email
const getLogedInTeacherDetails = asyncHandler(async(req,res)=>{
  const fullName = req?.user?.fullName
  const email = req?.user?.email

  const tr = await Teacher.findOne({email: email, fullName: fullName})
  .populate({
    path: "classesTaught",
    select: "className",
  })

  if(!tr){
    throw new ApiError(400,"Teacher not found !")
  }
  const teacherOfClass = await Class.find({classTeacherID: tr?._id}).select("-students -teachersOfClass -subjects")
  .populate({
    path: "classTeacherID",
    select: "fullName",
  })

  if(!teacherOfClass){
    throw new ApiError(400,"Your'r not yet Class Teacher of any class !")
  }

  return res.status(200).json(new ApiResponse(200, {teacher: tr, teacherOfClass: teacherOfClass[0]?.className}, "loged in Teacher details"))
})


 // all students of specific classTeacher
 const allStudentsOfSpecificClass = asyncHandler(async(req,res)=>{
  const fullName = req?.user?.fullName
  const email = req?.user?.email

  const tr = await Teacher.findOne({email: email, fullName: fullName})

  
  if(!tr){
    throw new ApiError(400,"Teacher not found !")
  }
  
  const teacherOfClass = await Class.findOne({classTeacherID: tr?._id})
  .populate({
    path: "students",
    select: "fullName",
  })

  if(!teacherOfClass){
    throw new ApiError(400,"Your'r not yet Class Teacher of any class !")
  }

  const allStudents = teacherOfClass?.students

  return res.status(200).json(new ApiResponse(200, allStudents, "loged in Teacher details"))
 })


 // get single student detail
 const getStudentDetail = asyncHandler(async(req,res)=>{
  const fullName = req?.user?.fullName
  const email = req?.user?.email

  const tr = await Teacher.findOne({email: email, fullName: fullName})

  
  if(!tr){
    throw new ApiError(400,"Teacher not found !")
  }
  
  const teacherOfClass = await Class.findOne({classTeacherID: tr?._id})
  .populate("students")

  if(!teacherOfClass){
    throw new ApiError(400,"Your'r not yet Class Teacher of any class !")
  }

  const allStudents = teacherOfClass?.students

  const student = allStudents?.find((student) => student?._id?.toString() === req.params?.id)

  if(!student){
    throw new ApiError(400,`Student not found !`)
  }

  return res.status(200).json(new ApiResponse(200, student, "loged in Teacher details"))
})


 // add students to class by class teacher only
 const addStudentsToClass = asyncHandler(async(req,res)=>{

  const fullNameOfLogedInTeacher = req?.user?.fullName
  const emailOfLogedInTeacher = req?.user?.email

  const tr = await Teacher.findOne({fullName: fullNameOfLogedInTeacher , email: emailOfLogedInTeacher })
  
  if(!tr){
    throw new ApiError(400,"Access Denied No Teacher Record Found  !")
  }

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
  
  const StudentExists = await Student.findOne({ email: email, fullName: fullName });

  const teacherOfClass = await Class.findOne({classTeacherID: tr?._id})
  const studentsInClass = teacherOfClass

  const phoneExists = await Student.findOne({phone: phone });
  const dOBExists = await Student.findOne({ DOB: DOB });

  if(!teacherOfClass){
    throw new ApiError(400,"Your'r not yet Class Teacher of any class !")
  }
  if(StudentExists){
    throw new ApiError(400,"Student with email and fullName already exists in db !")
  }
  else if (phone?.length > 11) {
    throw new ApiError(400, "Invalid phone number !");
  } else if (phoneExists) {
    throw new ApiError(400, "Phone number already exists !");
  } else if (dOBExists) {
    throw new ApiError(400, "Date of birth already exists !");
  }


  // if class  have students
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
        `rollNo already assigned to another student in ${teacherOfClass?.className}  !`
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

  return res.status(200).json(new ApiResponse(200, student, `student added to ${studentsInClass?.className}`))

})



// update class students by class teacher only
const updateStudentsOfClass = asyncHandler(async(req,res)=>{
  const fullNameOfLogedInTeacher = req?.user?.fullName
  const emailOfLogedInTeacher = req?.user?.email

  const tr = await Teacher.findOne({fullName: fullNameOfLogedInTeacher, email: emailOfLogedInTeacher })
  
  if(!tr){
    throw new ApiError(400,"Access Denied No Teacher Record Found  !")
  }

  const teacherOfClass = await Class.findOne({classTeacherID: tr?._id})
  .populate("students")

  if(!teacherOfClass){
    throw new ApiError(400,"Your'r not yet Class Teacher of any class !")
  }

  

})



 // all teachers of specific class
 const allTeachersOfSpecificClass = asyncHandler(async(req,res)=>{
  const fullName = req?.user?.fullName
  const email = req?.user?.email

  const tr = await Teacher.findOne({email: email, fullName: fullName})

  
  if(!tr){
    throw new ApiError(400,"Teacher not found !")
  }
  
  const teacherOfClass = await Class.findOne({classTeacherID: tr?._id})
  .populate({
    path: "teachersOfClass",
    select: "fullName",
  })

  if(!teacherOfClass){
    throw new ApiError(400,"Your'r not yet Class Teacher of any class !")
  }

  const allStudents = teacherOfClass?.teachersOfClass

  return res.status(200).json(new ApiResponse(200, allStudents, "loged in Teacher details"))
 })





export {
  //admin routes
  addTeacher,
  updateTeacher,
  getAllTeachers,
  deleteTeacher,
  getTeacherById,

  // teacher routes
  getLogedInTeacherDetails,
  allStudentsOfSpecificClass,
  getStudentDetail,
  allTeachersOfSpecificClass,
  addStudentsToClass,
  updateStudentsOfClass

};
