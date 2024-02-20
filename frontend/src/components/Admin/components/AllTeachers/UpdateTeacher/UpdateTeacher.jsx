import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminFetchAllTeachers,
  adminFetchSingleTeacher,
  adminUpdateTeacher,
  clearErrorTeachers,
} from "../../../../../store/features/admin.reducers";
import LoaderAn from "../../../LoaderAn/LoaderAn";
import AnNav from "../../../Navbar/AnNav";

const UpdateTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { msgUptTr, errUptTr, loadingTr, singleTr } = useSelector(
    (state) => state?.admin?.teachers
  );
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

  useEffect(() => {
    dispatch(adminFetchSingleTeacher(params?.id));
  }, [params?.id, dispatch]);

  const handleInputChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
    console.log(teacherData);
  };
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
    console.log(teacherData);
    dispatch(adminUpdateTeacher({ id: params?.id, data: formdata }));
  };

  useEffect(() => {
    if (msgUptTr) {
      toast.success(msgUptTr);
      navigate("/admin-portal/admin-all-teachers");
      dispatch(adminFetchAllTeachers());
    }
    if (errUptTr) {
      toast.error(errUptTr);
    }
    dispatch(clearErrorTeachers());
  }, [msgUptTr, errUptTr, dispatch]);

  useEffect(() => {
    if (singleTr?.[0]) {
      setTeacherData({
        firstName: singleTr?.[0]?.firstName,
        fullName: singleTr?.[0]?.fullName,
        age: singleTr?.[0]?.age,
        classesTaught: singleTr?.[0]?.classesTaught?.map((val) =>
          val?.className?.toLowerCase()
        ),
        email: singleTr?.[0]?.email,
        phone: singleTr?.[0]?.phone,
        address: singleTr?.[0]?.address,
        gender: singleTr?.[0]?.gender,
        sallary: singleTr?.[0]?.sallary,
        DOB: singleTr?.[0]?.DOB,
        status: singleTr?.[0]?.status,
        joiningDate: singleTr?.[0]?.joiningDate,
        leavingDate: singleTr?.[0]?.leavingDate,
        avatar: singleTr?.[0]?.avatar,
        bloodGroup: singleTr?.[0]?.bloodGroup,
        subject: singleTr?.[0]?.subject,
      });
    }
  }, [singleTr?.[0]]);

  return (
    <div className="p-[1.25rem] w-4/5 navdashMain">
      <AnNav />
      {loadingTr ? (
        <LoaderAn />
      ) : errUptTr ? (
        <>
          <div className="flex flex-col items-center justify-center h-[50vh] mt-28 w-full border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-4xl font-extrabold text-red-500 mb-2">
              {errUptTr}
            </h1>
            <p className="text-lg text-gray-600 leading-6">
              It seems like you haven't been assigned as the Admin.
            </p>
            <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-700">
              Request Administrator
            </button>
          </div>
        </>
      ) : (
        <div className=" max-w-5xl  p-6  shadow-md border-2 border-[#7a49c986]  mt-5 shadow-[#8b59dcc4] rounded-md">
          <h1 className="text-2xl border border-[#7a49c986] py-2 px-3 font-bold mb-6 rounded-lg text-gray-500">
            Update Teacher Form
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
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Science">Science</option>
                  <option value="Maths">Maths</option>
                  <option value="Pak-study">Pak-Study</option>
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
                  value={
                    teacherData?.DOB
                      ? new Date(teacherData?.DOB)
                          .toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          })
                          .replace(/[/]/g, "-")
                      : "" // Display an empty string for null values
                  }
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
                  value={
                    teacherData?.joiningDate
                      ? new Date(teacherData?.joiningDate)
                          .toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          })
                          .replace(/[/]/g, "-")
                      : "" // Display an empty string for null values
                  }
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
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
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
                  value={
                    teacherData?.leavingDate
                      ? new Date(teacherData?.leavingDate)
                          .toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          })
                          .replace(/[/]/g, "-")
                      : "" // Display an empty string for null values
                  }
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
                  {/* keep the value same as inner html value so the data will shown from db in selectables */}
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
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
                  Teacher Pic
                </label>
                <div className="flex flex-col gap-2">
                  <img
                    src={
                      singleTr?.[0] && singleTr?.[0]?.avatar
                        ? singleTr?.[0]?.avatar
                        : "/5. College Student.png"
                    }
                    alt="teacher pic"
                    className="h-[45px] w-[45px] rounded-full"
                    accept=".png, .jpg, .jpeg"
                    multiple={false}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                {loadingTr ? "Submiting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateTeacher;
