import React, { useEffect, useState } from "react";

const DeleteCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/courses/myCourses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []);

  const deleteCourse = async (courseId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:5000/courses/courses/${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete course");
      }

      // Remove the deleted course from state
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold text-center text-primary">
        Your Courses
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl"
            >
              <h2 className="mb-2 text-2xl font-semibold text-blue-600">
                {course.courseName}
              </h2>
              <p className="mb-1">
                <strong>Subject:</strong> {course.subjectName}
              </p>
              <p className="mb-1">
                <strong>Chapters:</strong> {course.chapters}
              </p>
              <p className="mb-1">
                <strong>Task:</strong> {course.task}
              </p>
              <p className="mb-1">
                <strong>Deadline:</strong>{" "}
                {new Date(course.deadline).toLocaleDateString()}
              </p>
              <p className="mb-3">
                <strong>Status:</strong>{" "}
                {course.status ? "Completed" : "Pending"}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => deleteCourse(course._id)}
                  className="px-6 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete Course
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No courses found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DeleteCourses;
