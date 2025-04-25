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
    <div className="min-h-screen p-6 mt-16 bg-gray-100">
      {" "}
      {/* Added mt-16 for margin-top */}
      <h1 className="mb-8 text-4xl font-semibold text-center text-primary">
        Your Courses
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="p-6 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg hover:shadow-xl"
            >
              <h2 className="mb-4 text-2xl font-semibold text-primary">
                {course.courseName}
              </h2>
              <div className="space-y-3">
                <p className="text-lg">
                  <strong className="font-medium">Subject:</strong>{" "}
                  {course.subjectName}
                </p>
                <p className="text-lg">
                  <strong className="font-medium">Chapters:</strong>{" "}
                  {course.chapters}
                </p>
                <p className="text-lg">
                  <strong className="font-medium">Task:</strong> {course.task}
                </p>
                <p className="text-lg">
                  <strong className="font-medium">Deadline:</strong>{" "}
                  {new Date(course.deadline).toLocaleDateString()}
                </p>
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

export default ViewCourses;
