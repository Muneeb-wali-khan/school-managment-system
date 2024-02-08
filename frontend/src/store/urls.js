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
    classSubjectsCurriculumUrl
}