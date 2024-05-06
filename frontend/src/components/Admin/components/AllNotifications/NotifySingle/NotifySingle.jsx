import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adminCreateForSingleNotification } from "../../../../../store/features/admin.reducers";

const NotifySingle = ({ loadingTr }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    fileLink: "",
    teacherFullName: "",
    teacherEmail: "",
  });

  const { title, desc, fileLink, teacherFullName, teacherEmail } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(adminCreateForSingleNotification(formData));
  };

  return (
    <form
      className="bg-white p-6 rounded-lg mb-4 mt-4 border-2 border-[#b444b4] sm:w-1/2 sm:h-[120vh] overflow-y-auto w-full h-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#b444b4]">
          Notify Teacher :
        </h2>
        <div className="relative">
          <label
            htmlFor="teacherFullName"
            className="block text-gray-700 font-semibold mb-1"
          >
            Teacher Full Name:
          </label>
          <input
            type="text"
            name="teacherFullName"
            value={teacherFullName}
            onChange={handleChange}
            placeholder="Teacher Full Name"
            className="form-input pl-10 pr-4 bg-gray-100 p-2 rounded-lg border-gray-300 w-full shadow-sm"
            required
          />
          <span className="absolute left-3 bottom-[-3px] transform -translate-y-1/2">
            <i className="fas fa-user text-gray-400"></i>
          </span>
        </div>

        <div className="relative">
          <label
            htmlFor="teacherEmail"
            className="block text-gray-700 font-semibold mb-1"
          >
            Teacher Email:
          </label>
          <input
            type="text"
            name="teacherEmail"
            value={teacherEmail}
            onChange={handleChange}
            placeholder="Teacher Email"
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
          className="bg-gradient-to-r from-[#b444b4] to-[#b119b1] text-white px-4 py-2 rounded-md font-semibold transition duration-300 hover:bg-[#663399d7] focus:outline-none focus:ring focus:border-blue-300 w-full"
        >
          {loadingTr ? "Creating..." : "Create Notification"}
        </button>
      </div>
    </form>
  );
};

export default NotifySingle;
