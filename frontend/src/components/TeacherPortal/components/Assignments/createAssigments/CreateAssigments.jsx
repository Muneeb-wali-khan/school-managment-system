import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAssignmentsOfClass } from "../../../../../store/features/teacher.reducers";

const CreateAssignments = ({ loadingAssigments }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    subject: "",
    dueDate: "",
    docLink: "",
  });

  const { subject, dueDate, docLink } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAssignmentsOfClass(formData));
    // Clear form data after submission
    setFormData({
      subject: "",
      dueDate: "",
      docLink: "",
    });
  };

  return (
    <form
      className="bg-white p-6 rounded-lg mb-4 mt-4 border-2 border-[#66339975] sm:w-1/2 sm:h-[120vh] overflow-y-auto w-full h-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#663399]">
          Create Assignment :
        </h2>
        <div className="relative">
          <label
            htmlFor="subject"
            className="block text-gray-700 font-semibold mb-1"
          >
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={handleChange}
            placeholder="Subject"
            className="form-input pl-10 pr-4 bg-gray-100 p-2 rounded-lg border-gray-300 w-full shadow-sm"
            required
          />
          <span className="absolute left-3 bottom-[-3px] transform -translate-y-1/2">
            <i className="fas fa-book text-gray-400"></i>
          </span>
        </div>

        <div className="relative">
          <label
            htmlFor="dueDate"
            className="block text-gray-700 font-semibold mb-1"
          >
            Due Date:
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={handleChange}
            placeholder="Due Date"
            className="form-input pl-10 pr-4 bg-gray-100 p-2 rounded-lg border-gray-300 w-full shadow-sm"
            required
          />
          <span className="absolute left-3 bottom-[-3px] transform -translate-y-1/2">
            <i className="far fa-calendar-alt text-gray-400"></i>
          </span>
        </div>

        <div className="relative">
          <label
            htmlFor="docLink"
            className="block text-gray-700 font-semibold mb-1"
          >
            Document Link:
          </label>
          <input
            type="url"
            id="docLink"
            name="docLink"
            value={docLink}
            onChange={handleChange}
            placeholder="Document Link"
            className="form-input pl-10 pr-4 bg-gray-100 p-2 rounded-lg border-gray-300 w-full shadow-sm"
            required
          />
          <span className="absolute left-3 bottom-[-3px] transform -translate-y-1/2">
            <i className="fas fa-link text-gray-400"></i>
          </span>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-[#8D5ADD] to-[#794ACA] text-white px-4 py-2 rounded-md font-semibold transition duration-300 hover:bg-[#663399d7] focus:outline-none focus:ring focus:border-blue-300 w-full"
        >
          {loadingAssigments ? "Creating..." : "Create Assignment"}
        </button>
      </div>
    </form>
  );
};

export default CreateAssignments;
