import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Layers, ClipboardList, CalendarDays } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch all courses
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

  // Delete a course
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

      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };

  // Mark course as completed manually
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

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === updatedCourse._id ? updatedCourse : course
        )
      );
    } catch (error) {
      console.error("Error updating course status:", error.message);
    }
  };

  // Decrease chapters by 1
  const decreaseChapter = async (courseId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:5000/courses/courses/${courseId}/decreaseChapter`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to decrease chapter");
      }

      const updatedCourse = await res.json();

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === updatedCourse._id ? updatedCourse : course
        )
      );
    } catch (error) {
      console.error("Error decreasing chapter:", error.message);
    }
  };

  return (
    <div className="min-h-screen px-4 pb-10 bg-gray-100 pt-28 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-center text-primary">
        My Courses
      </h1>

      {/* Large screen Add Course Button */}
      <div className="justify-end hidden mx-auto mb-6 lg:flex max-w-7xl">
        <button
          onClick={() => navigate("/courses/addcourses")}
          className="px-5 py-2 text-white transition duration-200 rounded-md bg-primary"
        >
          + Add Course
        </button>
      </div>

      {/* Small screen Add Course Button */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button
          onClick={() => navigate("/courses/addcourses")}
          className="px-4 py-3 text-white rounded-full shadow-lg bg-primary"
        >
          + Add
        </button>
      </div>

      <div className="grid gap-6 mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="flex flex-col justify-between h-[400px] p-6 bg-white shadow rounded-xl hover:shadow-md transition duration-300"
            >
              <div className="space-y-4">
                <h2 className="pb-2 text-xl font-semibold text-center text-gray-800 border-b">
                  {course.courseName}
                </h2>

                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <BookOpen className="w-4 h-4 text-primary mt-0.5" />
                  <span>
                    <strong>Subject:</strong> {course.subjectName}
                  </span>
                </div>

                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <Layers className="w-4 h-4 text-primary mt-0.5" />
                  <span>
                    <strong>Pending Chapters:</strong> {course.pendingChapters}
                  </span>
                </div>

                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <ClipboardList className="w-4 h-4 text-primary mt-0.5" />
                  <span>
                    <strong>Task:</strong> {course.task}
                  </span>
                </div>

                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <CalendarDays className="w-4 h-4 text-primary mt-0.5" />
                  <span>
                    <strong>Deadline:</strong>{" "}
                    {new Date(course.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-6">
                {course.pendingChapters > 0 ? (
                  <button
                    onClick={() => decreaseChapter(course._id)}
                    className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Complete 1 Chapter
                  </button>
                ) : (
                  <button
                    className="w-full py-2 text-white bg-green-500 rounded-md cursor-not-allowed"
                    disabled
                  >
                    All Chapters Completed
                  </button>
                )}

                {!course.status ? (
                  <button
                    onClick={() => markCourseAsCompleted(course._id)}
                    className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Mark as Completed
                  </button>
                ) : (
                  <button
                    className="w-full py-2 text-white bg-gray-500 rounded-md cursor-not-allowed"
                    disabled
                  >
                    Completed
                  </button>
                )}

                <button
                  onClick={() => deleteCourse(course._id)}
                  className="w-full py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
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

export default Courses;
