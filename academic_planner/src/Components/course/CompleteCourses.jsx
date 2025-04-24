import React, { useEffect, useState } from "react";

const CompleteCourses = () => {
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

  const markCourseAsCompleted = async (courseId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:5000/courses/courses/${courseId}/complete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update course status");
      }

      const updatedCourse = await res.json();

      // Update the course status in state
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === updatedCourse._id ? updatedCourse : course
        )
      );
    } catch (error) {
      console.error("Error updating course status:", error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold text-center text-primary">
        Your Courses
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="p-4 bg-white border rounded shadow"
            >
              <h2 className="text-xl font-semibold text-primary">
                {course.courseName}
              </h2>
              <p>
                <strong>Subject:</strong> {course.subjectName}
              </p>
              <p>
                <strong>Chapters:</strong> {course.chapters}
              </p>
              <p>
                <strong>Task:</strong> {course.task}
              </p>
              <p>
                <strong>Deadline:</strong>{" "}
                {new Date(course.deadline).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {course.status ? "✅ Completed" : "⏳ Pending"}
              </p>
              {!course.status && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => markCourseAsCompleted(course._id)}
                    className="px-6 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Mark as Completed
                  </button>
                </div>
              )}
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

export default CompleteCourses;
