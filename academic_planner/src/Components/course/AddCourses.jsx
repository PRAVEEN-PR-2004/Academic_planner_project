import React, { useState } from "react";

const AddCourses = () => {
  const [form, setForm] = useState({
    courseName: "",
    subjectName: "",
    deadline: "",
    chapters: "",
    task: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    // You can push this data to backend or local state here
  };

  return (
    <div className="min-h-screen px-6 py-10 pt-24 bg-gray-50">
      <div className="max-w-3xl p-10 mx-auto bg-white shadow-lg rounded-2xl">
        <h2 className="mb-8 text-3xl font-bold text-center text-primary">
          Add a New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              name="courseName"
              value={form.courseName}
              onChange={handleChange}
              placeholder="Enter course name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Subject Name
            </label>
            <input
              type="text"
              name="subjectName"
              value={form.subjectName}
              onChange={handleChange}
              placeholder="Enter subject name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Number of Chapters
            </label>
            <input
              type="number"
              name="chapters"
              value={form.chapters}
              onChange={handleChange}
              placeholder="Enter number of chapters"
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Task Description
            </label>
            <textarea
              name="task"
              value={form.task}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the task..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 font-semibold text-white transition bg-yellow-400 rounded-lg hover:bg-yellow-500"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourses;
