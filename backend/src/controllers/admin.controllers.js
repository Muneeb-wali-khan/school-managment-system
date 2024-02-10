import { Student } from "../models/student.model.js";
import { Class } from "../models/class.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinaryUploadImg } from "../utils/cloudinary.js";
import { Teacher } from "../models/teacher.model.js";
import { Subject } from "../models/subject.model.js";
import { changeToUpperCase } from "../utils/toUpperCase.js";


// =======================================STUDENT CONTROLLERS --ADMIN== START =================================================
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
      $and: [{ email }, { fullName }],
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
    const student = await Student.findByIdAndDelete(req.params.id)
  
    const removeStFromClass = await Class.findOne({
      students: { $in: req.params?.id },
    });
    if (!removeStFromClass) {
      throw new ApiError(404, "Student not found!");
    }
    if (!student) {
      throw new ApiError(404, "Student not found!");
    }
  
    removeStFromClass?.students?.pull(req.params?.id)
    await removeStFromClass.save({ validateBeforeSave: false });
  
    return res.status(200).json(new ApiResponse(200, null, "Student deleted successfully"))
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
  
// =======================================STUDENT CONTROLLERS --ADMIN == END =================================================








// =======================================TEACHER CONTROLLERS --ADMIN == START =================================================

const getAllTeachers = asyncHandler(async (req, res) => {
    const teachers = await Teacher.find().populate({
        path: "classesTaught",
        select: "className"
    });
  
    return res
      .status(200)
      .json(new ApiResponse(200, teachers, "Teachers fetched successfully"));
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
  
    return res
      .status(200)
      .json(new ApiResponse(200, teacher, "Teacher fetched successfully"));
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
  
// =======================================TEACHER CONTROLLERS --ADMIN == END =================================================







// =======================================CLASS CONTROLLERS --ADMIN == START =================================================

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
  
// =======================================CLASS CONTROLLERS --ADMIN == END =================================================







// =======================================SUBJECT CONTROLLERS --ADMIN == START =================================================

// all subjects
const allSubjects = asyncHandler(async (req, res) => {
    const subjects = await Subject.find();
  
    return res
      .status(200)
      .json(new ApiResponse(200, subjects, "subjects fetched"));
  });
  
  
  
  // get single subject
  const singleSubject = asyncHandler(async (req, res) => {
    const subject = await Subject.findById(req.params?.id)
      .populate({
        path: "teachers",
        select: "fullName",
      })
      .populate({
        path: "classes",
        select: "className",
      });

      if(!subject){
        throw new ApiError(404, "subject not found !")
      }
  
    return res.status(200).json(new ApiResponse(200, subject, "subject fetched"));
  });
  
  
  
  // add subjects
  const addSubject = asyncHandler(async (req, res) => {
    // remeber teachers and classes is not required
    // it will
    const { subjectName, teachers, classes, curriculum } = req.body;
  
    const upper =
      subjectName[0].toUpperCase() +
      subjectName.substring(1, subjectName?.length);
  
    const subjects = await Subject.findOne({ subjectName: upper });
  
    if (subjects) {
      throw new ApiError(400, `${subjectName} subject already exists`);
    }
  
    const subject = await Subject.create({
      subjectName: upper,
      teachers,
      classes,
      curriculum,
    });
  
    return res
      .status(201)
      .json(new ApiResponse(201, subject, `${upper} Subject added successfully`));
  });
  
  
  
  // remove subject
  const removeSubject = asyncHandler(async (req, res) => {
    const findClassesforSubject = await Class.find({
      subjects: req.params?.id,
    });
    if (!findClassesforSubject) {
      return new ApiError(400, "No classes found for this subject");
    }
    for (const sub of findClassesforSubject) {
      sub.subjects = sub?.subjects?.filter(
        (id) => id.toString() !== req.params?.id.toString()
      );
      await sub.save();
    }
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
    const {curriculumClass, year, description, documentationLink, keyTopics } = req.body;
  
    const subject = await Subject.findById(req.params?.id);
    if (!subject) {
      throw new ApiError(404, "subject not found !");
    }
    for (const curiculum of subject?.curriculum) {
      if(curriculumClass && curriculumClass?.toUpperCase() === curiculum?.curriculumClass){
        throw new ApiError(404, `curriculum of ${curriculumClass} already exists !`);
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
        new ApiResponse(200, subject, `${curriculumClass} Curriculum added successfully`)
      );
  });
  
  
  
  //update curriculum of a subject
  const updateCurriculumSubject = asyncHandler(async (req, res) => {
    const { curriculumId,curriculumClass, year, description, documentationLink, keyTopics } =
      req.body;
  
    const findSubject = await Subject.findById(req.params?.id);
    if (!findSubject) {
      throw new ApiError(404, "Subject not found!");
    }
  
    const record = findSubject?.curriculum.find(
      (r) => r._id.toString() === curriculumId
    );
  
    if (!record) {
      throw new ApiError(404, "Curriculum record not found!");
    }
  
    const updatedRecord = (
    record.curriculumClass = curriculumClass?.toUpperCase() || record.curriculumClass,
    record.year = year || record.year);
    record.description = description || record.description;
    record.documentationLink = documentationLink || record.documentationLink;
    record.keyTopics = keyTopics || record.keyTopics;
    console.log("curi done");
  
    if (!updatedRecord) {
      throw new ApiError(404, "Curriculum not updated");
    }
  
    const save = await findSubject.save();
  
    if (save) {
      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            updatedRecord,
            `${curriculumClass} Curriculum updated successfuly`
          )
        );
    }
  });
  
  
  
  // delete curriculum of a subject
  const deleteCurriculumSubject = asyncHandler(async (req, res) => {
    const { curriculumId } = req.body;
  
    const findSubject = await Subject.findById(req.params?.id);
    if (!findSubject) {
      throw new ApiError(404, "Subject not found!");
    }
  
    const record = findSubject?.curriculum.find(
      (r) => r._id.toString() === curriculumId
    );
  
    if (!record) {
      throw new ApiError(404, "Curriculum record not found!");
    }
    const deleteRecord = findSubject.curriculum = findSubject?.curriculum.filter(
      (r) => r._id.toString() !== curriculumId
    );
  
    if (!deleteRecord) {
      throw new ApiError(404, "Curriculum not updated");
    }
  
    const save = await findSubject.save();
  
    if (save) {
      return res
        .status(201)
        .json(new ApiResponse(201, deleteRecord, `${record?.curriculumClass} Curriculum record deleted successfuly`));
    }
  });

// =======================================SUBJECT CONTROLLERS --ADMIN == END =================================================




export {
    // student
    addStudent,
    getAllStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    allAcademicRecordStudent,
    addAcademicRecordStudent,
    updatedStudentAcedamicRecord,
    deleteAcademicRecord,

    // teacher
    addTeacher,
    updateTeacher,
    getAllTeachers,
    deleteTeacher,
    getTeacherById,

    // class
    addClass,
    allClasses,
    updateClass,
    deleteClass,
    singleClass ,

    // subject
    addSubject,
    allSubjects,
    singleSubject,
    removeSubject,
    allCurriculumSubject,
    addCurriculumSubject,
    updateCurriculumSubject,
    deleteCurriculumSubject,
  };
  