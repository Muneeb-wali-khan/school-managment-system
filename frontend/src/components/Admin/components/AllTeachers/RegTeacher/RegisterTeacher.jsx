import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adminAddTeacher, adminFetchAllTeachers, clearErrorTeachers } from "../../../../../store/features/admin.reducers";
import AnNav from "../../../Navbar/AnNav";
import LoaderAn from "../../../LoaderAn/LoaderAn";

const RegisterTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loadingTr, errTr, msgTr } = useSelector(
    (state) => state?.admin?.teachers
  );
  const [avatar, setAvatar] = useState("");
  const [avatarVeiw, setAvatarVeiw] = useState("");
  const [teacherData, setTeacherData] = useState({
    firstName: "",
    fullName: "",
    age: 0,
    classesTaught: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    sallary: 0,
    DOB: Date,
    status: "",
    joiningDate: Date,
    leavingDate: Date,
    avatar: "",
    subject: "",
    bloodGroup: "",
  });

  const handleInputChange = (e)=>{
    setTeacherData({...teacherData, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("firstName", teacherData.firstName);
    formdata.append("fullName", teacherData.fullName);
    formdata.append("age", teacherData.age);
    formdata.append("classesTaught", teacherData.classesTaught);
    formdata.append("email", teacherData.email);
    formdata.append("phone", teacherData.phone);
    formdata.append("address", teacherData.address);
    formdata.append("gender", teacherData.gender);
    formdata.append("sallary", teacherData.sallary);
    formdata.append("DOB", teacherData.DOB);
    formdata.append("status", teacherData.status);
    formdata.append("joiningDate", teacherData.joiningDate);
    formdata.append("leavingDate", teacherData.leavingDate);
    formdata.append("avatar", teacherData.avatar);
    formdata.append("bloodGroup", teacherData.bloodGroup);
    formdata.append("subject", teacherData.subject);
    
    dispatch(adminAddTeacher(formdata))
    console.log(teacherData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const showimg = URL.createObjectURL(file);
    setAvatarVeiw(showimg);
    // set the avatar to file in teacherData
    setTeacherData({ ...teacherData, avatar: file });
  };

  useEffect(()=>{
      if(msgTr){
        toast.success(msgTr)
        navigate("/admin-portal/admin-all-teachers")
        dispatch(adminFetchAllTeachers())
      }
      if(errTr){
        toast.error(errTr)
      }
      dispatch(clearErrorTeachers())
  },[msgTr, errTr, dispatch])



  
    return (
      <div className="p-[1.25rem] w-4/5 navdashMain">
        <AnNav />
        {loadingTr ? (
          <LoaderAn />
        )
         : errTr ? <>
            <div className="flex flex-col items-center justify-center h-[50vh] mt-28 w-full border border-gray-300 rounded-lg shadow-lg">
              <h1 className="text-4xl font-extrabold text-red-500 mb-2">
                {errTr}
              </h1>
              <p className="text-lg text-gray-600 leading-6">
                It seems like you haven't been assigned as the admin.
              </p>
              <p className="text-lg text-gray-600 leading-6 mt-4">
                Contact your administrator for further assistance.
              </p>
            </div>
        </>
        : (
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
                    value={teacherData?.firstName}
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
                    value={teacherData?.fullName}
                    id="fullName"
                    name="fullName"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-600"
                  >
                  Age
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="text"
                    value={teacherData?.age}
                    name="age"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

              </div>

              {/* email, subject, classes taught */}
              <div className="grid mb-3 grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="classesTaught"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Classes Taught
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="text"
                    placeholder="ex: class 1, class 2"
                    value={teacherData?.classesTaught}
                    name="classesTaught"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* fetch from db */}
                <div>
                  <label
                    htmlFor="Subject"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Subject
                  </label>
                  <select
                  onChange={handleInputChange}
                  value={teacherData?.subject}
                    name="subject"
                    className="text-sm font-medium text-gray-600 mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Subject</option>
                    <option value="english">English</option>
                    <option value="urdu">Urdu</option>
                    <option value="science">Science</option>
                    <option value="maths">Maths</option>
                    <option value="science">Science</option>
                  </select>
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
                    value={teacherData?.email}
                    name="email"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* age, phone, dob */}
              <div className="grid mb-3 grid-cols-1 sm:grid-cols-3 gap-4">

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
                    value={teacherData?.phone}
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
                    type="text"
                    id="dob"
                    value={teacherData?.DOB}
                    name="DOB"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="joiningDate"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Joining Date (format: month-day-year)
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="text"
                    value={teacherData?.joiningDate}
                    name="joiningDate"
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
                  value={teacherData?.gender}
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
                    Leaving Date (format: month-day-year)
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="text"
                    value={teacherData?.leavingDate}
                    name="leavingDate"
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
                  value={teacherData?.bloodGroup}
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

              {/* sallary, status */}
              <div className="grid mb-3 grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label
                    htmlFor="Sallary"
                    className="block text-sm font-medium text-gray-600"
                  >
                   Sallary
                  </label>
                  <input
                  onChange={handleInputChange}
                    type="number"
                    value={teacherData?.sallary}
                    name="sallary"
                    className="mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Status
                  </label>
                  <select
                  onChange={handleInputChange}
                  value={teacherData?.status}
                    name="status"
                    className="text-sm font-medium text-gray-600 mt-1 border-[#7a49c986] p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="=inactive">In Active</option>
                  </select>
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
                    value={teacherData?.address}
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
                        alt="teacher pic"
                        className="h-[45px] w-[45px] rounded-full"
                      />
                    ) : (
                      <img
                        src={avatar ? avatar : "/5. College Student.png"}
                        alt="teacher pic"
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

export default RegisterTeacher;
