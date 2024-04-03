import React, { useEffect, useState } from "react";
import TrNav from "../../../Navbar/TrNav";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../loader/Loader";
import { addStudentToClass, clearErrorsTeacher,allStudentsClass } from "../../../../../store/features/teacher.reducers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loadingTeacher, msgAddSt, errAddSt, errorTeacher } = useSelector(
    (state) => state?.teacher?.teacherD
  );
  const [avatar, setAvatar] = useState("");
  const [avatarVeiw, setAvatarVeiw] = useState("");
  const [studentData, setStudentData] = useState({
    firstName: "",
    fullName: "",
    rollNo: 0,
    age: 0,
    admissionClass: "class",
    fatherName: "",
    email: "",
    monthlyFee: 0,
    securityFee: 0,
    labFee: 0,
    phone: "",
    address: "",
    gender: "",
    DOB: "",
    avatar: "",
    joiningDate: "",
    bloodGroup: "",
  });

  const handleInputChange = (e)=>{
    setStudentData({...studentData, [e.target.name]: e.target.value})
    console.log(studentData);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("firstName", studentData.firstName);
    formdata.append("fullName", studentData.fullName);
    formdata.append("rollNo", studentData.rollNo);
    formdata.append("age", studentData.age);
    formdata.append("admissionClass", studentData.admissionClass);
    formdata.append("fatherName", studentData.fatherName);
    formdata.append("email", studentData.email);
    formdata.append("monthlyFee", studentData.monthlyFee);
    formdata.append("securityFee", studentData.securityFee);
    formdata.append("labFee", studentData.labFee);
    formdata.append("phone", studentData.phone);
    formdata.append("address", studentData.address);
    formdata.append("gender", studentData.gender);
    formdata.append("DOB", studentData.DOB);
    formdata.append("avatar", studentData.avatar);
    formdata.append("joiningDate", studentData.joiningDate);
    formdata.append("bloodGroup", studentData.bloodGroup);
    
    dispatch(addStudentToClass(formdata))
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const showimg = URL.createObjectURL(file);
    setAvatarVeiw(showimg);
    // set the avatar to file in studentData
    setStudentData({ ...studentData, avatar: file });
  };

  useEffect(()=>{
      if(msgAddSt){
        toast.success(msgAddSt)
        navigate("/teacher-portal/teacher-students")
        dispatch(allStudentsClass())
      }
      if(errAddSt){
        toast.error(errAddSt)
      }
      dispatch(clearErrorsTeacher())
  },[msgAddSt, errAddSt, dispatch])


  if ((errorTeacher && errorTeacher !== null) || errorTeacher) {
    return (
      <>
        {loadingTeacher ? (
          <Loader />
        ) : (
          <div className="p-[1.25rem] w-4/5 navdashMain">
            <TrNav />
            <div className="flex flex-col items-center justify-center h-[50vh] mt-28 w-full border border-gray-300 rounded-lg shadow-lg">
              <h1 className="text-4xl font-extrabold text-red-500 mb-2">
                {errorTeacher}
              </h1>
              <p className="text-lg text-gray-600 leading-6">
                It seems like you haven't been assigned as the Class Teacher for
                any class yet.
              </p>
              <p className="text-lg text-gray-600 leading-6 mt-4">
                Contact your administrator for further assistance.
              </p>
              <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-700">
                Request Administrator
              </button>
            </div>
          </div>
        )}
      </>
    );
  } 
  
  else {
    return (
      <div className="p-[1.25rem] w-4/5 navdashMain">
        <TrNav />
        {loadingTeacher ? (
          <Loader />
        ) : (
          <div className=" max-w-5xl  p-6  shadow-md border-2 border-[#7a49c986]  mt-5 shadow-[#8b59dcc4] rounded-md">
            <h1 className="text-2xl border border-[#7a49c986] py-2 px-3 font-bold mb-6 rounded-lg text-gray-500">
              Student Registration Form
            </h1>
            <form onSubmit={handleSubmit}>
              {/* fullname, firstname, fathername */}
              <div className="grid mb-3  grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-600"
                  >
                    First Name
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="text"
                    id="firstName"
                    value={studentData?.firstName}
                    name="firstName"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Full Name
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="text"
                    value={studentData?.fullName}
                    id="fullName"
                    name="fullName"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fatherName"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Father's Name
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="text"
                    id="fatherName"
                    value={studentData?.fatherName}
                    name="fatherName"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* email, rollno, admission */}
              <div className="grid mb-3 grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="admissionClass"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Admission Class
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="text"
                    id="admissionClass"
                    value={studentData?.admissionClass}
                    name="admissionClass"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rollNo"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Roll No
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="number"
                    id="rollNo"
                    value={studentData?.rollNo}
                    name="rollNo"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="email"
                    id="email"
                    value={studentData?.email}
                    name="email"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* age, phone, dob */}
              <div className="grid mb-3 grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Age
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="number"
                    id="age"
                    value={studentData?.age}
                    name="age"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Phone
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="number"
                    id="phone"
                    value={studentData?.phone}
                    name="phone"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-600"
                  >
                    DOB (format: month-day-year)
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="date"
                    id="dob"
                    value={studentData?.DOB}
                    name="DOB"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* gender, joining date, blood g */}
              <div className="grid mb-3 grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Gender
                  </label>
                  <select
                  onChange={handleInputChange}
                  value={studentData?.gender}
                    name="gender"
                    className="text-sm font-medium text-gray-600 mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="Joining Date"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Joining Date (format: month-day-year)
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="date"
                    value={studentData?.joiningDate}
                    id="joiningDate"
                    name="joiningDate"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bloodGroup"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Blood Group
                  </label>
                  <select
                  onChange={handleInputChange}
                  value={studentData?.bloodGroup}
                    name="bloodGroup"
                    className="text-sm font-medium text-gray-600 mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="a+">A+</option>
                    <option value="b+">B+</option>
                    <option value="a-">A-</option>
                    <option value="b-">B-</option>
                    <option value="ab+">AB+</option>
                    <option value="ab-">AB-</option>
                    <option value="o+">O+</option>
                    <option value="o-">O-</option>
                  </select>
                </div>
              </div>

              {/* monthly fee, security fee , lab fee */}
              <div className="grid mb-3 grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="monthlyFee"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Monthly Fee
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="number"
                    id="monthlyFee"
                    value={studentData?.monthlyFee}
                    name="monthlyFee"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="securityFee"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Security Fee
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="number"
                    id="securityFee"
                    value={studentData?.securityFee}
                    name="securityFee"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="Lab Fee"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Lab Fee
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="number"
                    id="Lab Fee"
                    value={studentData?.labFee}
                    name="labFee"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* avatar, address */}
              <div className="grid mb-3 grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Address
                  </label>
                  <textarea
                  onChange={handleInputChange}
                    id="address"
                    name="address"
                    value={studentData?.address}
                    rows="2"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Student Pic
                  </label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      id="avatar"
                      name="avatar"
                      className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {avatarVeiw ? (
                      <img
                        src={avatar && avatarVeiw}
                        alt="student pic"
                        className="h-[45px] w-[45px] rounded-full"
                      />
                    ) : (
                      <img
                        src={avatar ? avatar : "/5. College Student.png"}
                        alt="student pic"
                        className="h-[45px] w-[45px] rounded-full"
                        accept=".png, .jpg, .jpeg"
                        multiple={false}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
};

export default AddStudent;
