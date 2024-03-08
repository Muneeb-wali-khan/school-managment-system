import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  takeAttendance,
  allStudentsClass as allStudentsOfClass,
  clearErrorsTeacher,
} from "../../../../store/features/teacher.reducers";
import toast from "react-hot-toast"

const TakeAttendance = () => {
  const dispatch = useDispatch();
  const { allStudentsClass, loadingTeacher, errorTeacher,msgTeacher } = useSelector(
    (state) => state.teacher?.teacherD
  );

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    dispatch(allStudentsOfClass());
  }, [dispatch]);


  useEffect(() => {
    if (allStudentsClass && allStudentsClass[0]) {
      const initialAttendance = allStudentsClass[0].map((student) => ({
        studentID: student._id,
        status: "present", // defaulting to "present" for all students
        studentName: student.fullName,
      }));
      setAttendance(initialAttendance);
    }
  }, [allStudentsClass]);


  const handleAttendanceChange = (studentID, status, studentName) => {
    setAttendance((prevAttendance) => // prev means we have set the values in useeffect already onload
      prevAttendance.map((student) =>
        student.studentID === studentID
          ? { ...student, status, studentName }
          : student
      )
    );
  };

  const handleTakeAttendance = () => {
    dispatch(takeAttendance(attendance));
  };

  useEffect(()=>{
    if(msgTeacher){
      toast.success(msgTeacher)
    }
    if(errorTeacher){
      toast.error(errorTeacher)
    }
    dispatch(clearErrorsTeacher())
  },[msgTeacher, errorTeacher, dispatch])

  return (
    <div>
      <h2>Take Attendance</h2>
      <form>
        {allStudentsClass &&
          Array.isArray(allStudentsClass[0]) &&
          allStudentsClass[0].length > 0 &&
          allStudentsClass[0].map((student) => (
            <div key={student._id}>
              <label>
                {student.fullName}:
                <select
                  onChange={(e) =>
                    handleAttendanceChange(
                      student._id,
                      e.target.value,
                      student.fullName
                    )
                  }
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </label>
            </div>
          ))}

        <button className=" px-3 py-2 border-2  mt-5 rounded-lg font-extrabold" type="button" onClick={handleTakeAttendance}>
          {loadingTeacher ?  'Submitting....' : "Submit Attendance"}
        </button>
      </form>
    </div>
  );
};

export default TakeAttendance;
