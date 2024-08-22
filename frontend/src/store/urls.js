const loginUrl = "https://school-managment-system-pi.vercel.app/api/v1/users/login"
const registerUrl = "https://school-managment-system-pi.vercel.app/api/v1/users/register"
const logoutUrl = "https://school-managment-system-pi.vercel.app/api/v1/users/logout"
const userProfileUrl = "https://school-managment-system-pi.vercel.app/api/v1/users/user/me"
const updatePasswordUrl = "https://school-managment-system-pi.vercel.app/api/v1/users/user/change-password"
const updateProfileUrl = "https://school-managment-system-pi.vercel.app/api/v1/users/user/update-profile"
const updateAvatarUrl = "https://school-managment-system-pi.vercel.app/api/v1/users/user/update-avatar"

// teacher urls
const profileUrlTeacher = "https://school-managment-system-pi.vercel.app/api/v1/teacher/teacher-profile"
const allStudentsClassUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/all-students-class"
const classStudentDetailsUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/single-student-detail/"
const classAddStudentUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/class-teacher-add-student"
const classUpdateStudentUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/update-student-class/"
const classDeleteStudentUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/remove-student-class/"
const classStudentUpdateAvatarUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/update-student-avatar/"
const classTeachersOfClassUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/all-teachers-class"
const classSubjectsUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/all-subjects-class"
const classSubjectsCurriculumUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/curriculum-subject"
const classStudentAttendance = "https://school-managment-system-pi.vercel.app/api/v1/teacher/take-attendance-class"
const classStudentAttendanceToday = "https://school-managment-system-pi.vercel.app/api/v1/teacher/attendance-class-today"
const classAbsentNotifyStudents = "https://school-managment-system-pi.vercel.app/api/v1/teacher/notify-students-absent"
const giveAssignmentsClass = "https://school-managment-system-pi.vercel.app/api/v1/teacher/give-assigment-class"
const allAssignmentsClass = "https://school-managment-system-pi.vercel.app/api/v1/teacher/all-assigments-class"
const singleAssignmentClass = "https://school-managment-system-pi.vercel.app/api/v1/teacher/single-assigment-class?id="
const updateAssignmentOfClassUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/update-assigment-class?id="
const deleteAssignmentOfClassUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/delete-assigment-class?id="
const allNotificationsForTeachersUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/all-notifications-for-teachers"
const allNotificationsPersonalTeacherUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/single-teacher-notifications"
const classAllNotificationsUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/all-notifications-class"
const createAllNotificationsUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/notify-students-class"
const createSingleNotificationUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/notify-single-student-class"
const SingleNotificationClassUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/single-notification-class/"
const updateSingleNotificationUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/update-notification-class/"
const deleteSingleNotificationUrl = "https://school-managment-system-pi.vercel.app/api/v1/teacher/delete-notification-class/"


// student urls
const profileUrlStudent = "https://school-managment-system-pi.vercel.app/api/v1/student/student-profile"
const StudentAttendanceUrl = "https://school-managment-system-pi.vercel.app/api/v1/student/student-attendance-record"
const StudentAssigmentsUrl = "https://school-managment-system-pi.vercel.app/api/v1/student/student-class-assigments"
const StudentsNotificationsUrl = "https://school-managment-system-pi.vercel.app/api/v1/student/student-class-notifications"
const SingleStudentNotificationsUrl = "https://school-managment-system-pi.vercel.app/api/v1/student/single-student-notifications"






// ADMIN urls

//student
const adminAllStudentsUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/all-students"
const adminStudentDetailsUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/student/"
const adminStudentAvatarUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/update-student-avatar/"
const adminStudentRegisterUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/add-student"
const adminStudentUpdateUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/update-student/"
const adminStudentRemoveUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/remove-student/"
const adminStudentAcademicRecordUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/all-student-academic-record/"
const adminSingleAcademicRecordUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/single-student-academic-record/"
const adminAddAcademicRecordUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/add-student-academic-record/"
const adminUpdateAcademicRecordUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/update-student-academic-record/"
const adminDeleteAcademicRecordUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/remove-student-academic-record/"

// teacher
const adminAllTeachersUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/all-teachers"
const adminTeacherDetailsUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/single-teacher/"
const adminTeacherAddUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/add-teacher"
const adminTeacherUpdateUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/update-teacher/"
const adminTeacherUpdateAvatarUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/update-avatar-teacher/"
const adminTeacherDeleteUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/remove-teacher/"
const adminAllNotificationsUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/notifications-all"
const adminAddNotificationUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/notify-teachers"
const adminAddSingleNotificationUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/notify-single-teacher"
const adminSingleNotificationUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/notification-single/"
const adminUpdateNotificationUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/update-notification/"
const adminDeleteNotificationUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/delete-notification/"

// subjects
const adminAllSubjectsUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/all-subjects"
const adminSingleSubjectUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/single-subject/"
const adminAddSubjectUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/add-subject"
const adminRemoveSubjectUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/remove-subject/"
const adminAllSubjectCurriculumUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/all-curriculums-subject/"
const adminAddSubjectCurriculumUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/add-curriculum/"
const adminSingleCurriculumUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/single-curriculum/"
const adminUpdateCurriculumUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/update-curriculum/"
const adminDeleteCurriculumUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/remove-curriculum/"

// classes
const adminAllClassesUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/all-classes"
const adminSingleClassUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/single-class/"
const adminAddClassUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/add-class"
const adminUpdateClassUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/update-class/"
const adminRemoveClassUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/remove-class/"
const AdminAllAttendancesClassUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/all-attendances-class/"


// users
const adminAllUsersWebAppUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/all-users"
const adminSingleUserWebAppUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/single-user/"
const adminUpdateUserWebAppUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/update-user-role/"
const adminRemoveUserWebAppUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/remove-user/"
const updateUserAvatarUrl = "https://school-managment-system-pi.vercel.app/api/v1/admin/update-user-avatar/"


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
    classStudentAttendance,
    classStudentAttendanceToday,
    classAbsentNotifyStudents,
    giveAssignmentsClass,
    allAssignmentsClass,
    singleAssignmentClass,
    updateAssignmentOfClassUrl,
    deleteAssignmentOfClassUrl,
    allNotificationsForTeachersUrl,
    allNotificationsPersonalTeacherUrl,
    classAllNotificationsUrl,
    createAllNotificationsUrl,
    createSingleNotificationUrl,
    updateSingleNotificationUrl,
    SingleNotificationClassUrl,
    deleteSingleNotificationUrl,


    // student urls
    profileUrlStudent,
    StudentAttendanceUrl,
    StudentAssigmentsUrl,
    StudentsNotificationsUrl,
    SingleStudentNotificationsUrl,



    //ADMIN ROUTES

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
    adminAllNotificationsUrl,
    adminAddNotificationUrl,
    adminAddSingleNotificationUrl,
    adminUpdateNotificationUrl,
    adminSingleNotificationUrl,
    adminDeleteNotificationUrl,

    // subjects
    adminAllSubjectsUrl,
    adminSingleSubjectUrl,
    adminAddSubjectUrl,
    adminRemoveSubjectUrl,
    adminAllSubjectCurriculumUrl,
    adminAddSubjectCurriculumUrl,
    adminSingleCurriculumUrl,
    adminUpdateCurriculumUrl,
    adminDeleteCurriculumUrl,

    //classes
    adminAllClassesUrl,
    adminSingleClassUrl,
    adminAddClassUrl,
    adminUpdateClassUrl,
    adminRemoveClassUrl,
    AdminAllAttendancesClassUrl,

    // users web app
    adminAllUsersWebAppUrl,
    adminSingleUserWebAppUrl,
    adminUpdateUserWebAppUrl,
    adminRemoveUserWebAppUrl,
    updateUserAvatarUrl

}
