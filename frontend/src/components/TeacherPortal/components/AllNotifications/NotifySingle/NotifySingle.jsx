import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { singleNotificationForSt } from "../../../../../store/features/teacher.reducers";

const NotifySingle = ({ loadingNotifications }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    fileLink: "",
    studentFullName: "",
    studentEmail: "",
  });

  const { title, desc, fileLink, studentFullName, studentEmail } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(singleNotificationForSt(formData));
    setFormData({
      title: "",
      desc: "",
      fileLink: "",
      studentFullName: "",
      studentEmail: "",
    });
  };

  return (
    <form
      className="bg-white p-6 rounded-lg mb-4 mt-4 border-2 border-[#66339975] sm:w-1/2 sm:h-[120vh] overflow-y-auto w-full h-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#663399]">
          Notify Student :
        </h2>
        <div className="relative">
          <label
            htmlFor="studentFullName"
            className="block text-gray-700 font-semibold mb-1"
          >
            Student Full Name:
          </label>
          <input
            type="text"
            name="studentFullName"
            value={studentFullName}
            onChange={handleChange}
            placeholder="Student Full Name"
            className="form-input pl-10 pr-4 bg-gray-100 p-2 rounded-lg border-gray-300 w-full shadow-sm"
            required
          />
          <span className="absolute left-3 bottom-[-3px] transform -translate-y-1/2">
            <i className="fas fa-user text-gray-400"></i>
          </span>
        </div>

        <div className="relative">
          <label
            htmlFor="studentEmail"
            className="block text-gray-700 font-semibold mb-1"
          >
            Student Email:
          </label>
          <input
            type="text"
            name="studentEmail"
            value={studentEmail}
            onChange={handleChange}
            placeholder="Student Email"
            className="form-input pl-10 pr-4 bg-gray-100 p-2 rounded-lg border-gray-300 w-full shadow-sm"
            required
          />
          <span className="absolute left-3 bottom-[-3px] transform -translate-y-1/2">
            <i className="fas fa-envelope text-gray-400"></i>
          </span>
        </div>

        <div className="relative">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-1"
          >
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Title"
            className="form-input pl-10 pr-4 bg-gray-100 p-2 rounded-lg border-gray-300 w-full shadow-sm"
            required
          />
          <span className="absolute left-3 bottom-[-3px] transform -translate-y-1/2">
            <i className="fas fa-heading text-gray-400"></i>
          </span>
        </div>

        <div className="relative">
          <label
            htmlFor="dueDate"
            className="block text-gray-700 font-semibold mb-1"
          >
            Description:
          </label>
          <textarea
            type="text"
            name="desc"
            cols={10}
            rows={3}
            value={desc}
            onChange={handleChange}
            placeholder="Description"
            className="form-input pl-5 pr-4 bg-gray-100 p-2 rounded-lg border-gray-300 w-full shadow-sm"
            required
          />
        </div>

        <div className="relative">
          <label
            htmlFor="docLink"
            className="block text-gray-700 font-semibold mb-1"
          >
            file Link:{" "}
            <span className="text-xs ml-2 text-yellow-500">Optional</span>
          </label>
          <input
            type="url"
            name="fileLink"
            value={fileLink}
            onChange={handleChange}
            placeholder="File Link"
            className="form-input pl-10 pr-4 bg-gray-100 p-2 rounded-lg border-gray-300 w-full shadow-sm"
          />
          <span className="absolute left-3 bottom-[-3px] transform -translate-y-1/2">
            <i className="fas fa-link text-gray-400"></i>
          </span>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-[#8D5ADD] to-[#794ACA] text-white px-4 py-2 rounded-md font-semibold transition duration-300 hover:bg-[#663399d7] focus:outline-none focus:ring focus:border-blue-300 w-full"
        >
          {loadingNotifications ? "Creating..." : "Create Notification"}
        </button>
      </div>
    </form>
  );
};

export default NotifySingle;
