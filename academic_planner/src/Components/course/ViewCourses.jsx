import React, { useEffect, useState } from "react";

const ViewCourses = () => {
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

export default ViewCourses;
