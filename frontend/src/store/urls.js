const loginUrl = "/api/v1/users/login"
const registerUrl = "/api/v1/users/register"
const logoutUrl = "/api/v1/users/logout"
const userProfileUrl = "/api/v1/users/user/me"
const updatePasswordUrl = "/api/v1/users/user/change-password"
const updateProfileUrl = "/api/v1/users/user/update-profile"
const updateAvatarUrl = "/api/v1/users/user/update-avatar"

// teacher urls
const profileUrlTeacher = "/api/v1/teacher/teacher-profile"
const allStudentsClassUrl = "/api/v1/teacher/all-students-class"
const classStudentDetailsUrl = "/api/v1/teacher/single-student-detail/"
const classAddStudentUrl = "/api/v1/teacher/class-teacher-add-student"
const classUpdateStudentUrl = "/api/v1/teacher/update-student-class/"
const classDeleteStudentUrl = "/api/v1/teacher/remove-student-class/"
const classStudentUpdateAvatarUrl = "/api/v1/teacher/update-student-avatar/"
const classTeachersOfClassUrl = "/api/v1/teacher/all-teachers-class"
const classSubjectsUrl = "/api/v1/teacher/all-subjects-class"
const classSubjectsCurriculumUrl = "/api/v1/teacher/curriculum-subject"


// admin urls

//student
const adminAllStudentsUrl = "/api/v1/admin/all-students"
const adminStudentDetailsUrl = "/api/v1/admin/student/"
const adminStudentAvatarUrl = "/api/v1/admin/update-student-avatar/"
const adminStudentRegisterUrl = "/api/v1/admin/add-student"
const adminStudentUpdateUrl = "/api/v1/admin/update-student/"
const adminStudentRemoveUrl = "/api/v1/admin/remove-student/"
const adminStudentAcademicRecordUrl = "/api/v1/admin/all-student-academic-record/"
const adminSingleAcademicRecordUrl = "/api/v1/admin/single-student-academic-record/"
const adminAddAcademicRecordUrl = "/api/v1/admin/add-student-academic-record/"
const adminUpdateAcademicRecordUrl = "/api/v1/admin/update-student-academic-record/"
const adminDeleteAcademicRecordUrl = "/api/v1/admin/remove-student-academic-record/"

// teacher
const adminAllTeachersUrl = "/api/v1/admin/all-teachers"
const adminTeacherDetailsUrl = "/api/v1/admin/single-teacher/"
const adminTeacherAddUrl = "/api/v1/admin/add-teacher"
const adminTeacherUpdateUrl = "/api/v1/admin/update-teacher/"
const adminTeacherUpdateAvatarUrl = "/api/v1/admin/update-avatar-teacher/"
const adminTeacherDeleteUrl = "/api/v1/admin/remove-teacher/"

// subjects
const adminAllSubjectsUrl = "/api/v1/admin/all-subjects"
const adminSingleSubjectUrl = "/api/v1/admin/single-subject/"
const adminAddSubjectUrl = "/api/v1/admin/add-subject"
const adminRemoveSubjectUrl = "/api/v1/admin/remove-subject/"
const adminAllSubjectCurriculumUrl = "/api/v1/admin/all-curriculums-subject/"
const adminAddSubjectCurriculumUrl = "/api/v1/admin/add-curriculum/"
const adminSingleCurriculumUrl = "/api/v1/admin/single-curriculum/"
const adminUpdateCurriculumUrl = "/api/v1/admin/update-curriculum/"
const adminDeleteCurriculumUrl = "/api/v1/admin/remove-curriculum/"





export  {
    loginUrl,
    registerUrl,
    logoutUrl,
    userProfileUrl,
    updatePasswordUrl,
    updateProfileUrl,
    updateAvatarUrl,
    
    // teacher urls
    profileUrlTeacher,
    allStudentsClassUrl,
    classStudentDetailsUrl,
    classAddStudentUrl,
    classUpdateStudentUrl,
    classDeleteStudentUrl,
    classStudentUpdateAvatarUrl,
    classTeachersOfClassUrl,
    classSubjectsUrl,
    classSubjectsCurriculumUrl,

    //admin
    //students
    adminAllStudentsUrl,
    adminStudentDetailsUrl,
    adminStudentAvatarUrl,
    adminStudentRegisterUrl,
    adminStudentUpdateUrl,
    adminStudentRemoveUrl,
    adminStudentAcademicRecordUrl,
    adminSingleAcademicRecordUrl,
    adminAddAcademicRecordUrl,
    adminUpdateAcademicRecordUrl,
    adminDeleteAcademicRecordUrl,
    // teachers
    adminAllTeachersUrl,
    adminTeacherDetailsUrl,
    adminTeacherAddUrl,
    adminTeacherUpdateUrl,
    adminTeacherUpdateAvatarUrl,
    adminTeacherDeleteUrl,

    // subjects
    adminAllSubjectsUrl,
    adminSingleSubjectUrl,
    adminAddSubjectUrl,
    adminRemoveSubjectUrl,
    adminAllSubjectCurriculumUrl,
    adminAddSubjectCurriculumUrl,
    adminSingleCurriculumUrl,
    adminUpdateCurriculumUrl,
    adminDeleteCurriculumUrl

}