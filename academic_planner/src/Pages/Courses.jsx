import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Layers, ClipboardList, CalendarDays } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch all courses (unchanged)
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

  // Delete a course (unchanged)
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

  // Mark course as completed manually (unchanged)
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

  // Decrease chapters by 1 (unchanged)
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
    <div className="min-h-screen px-4 pb-10 bg-gray-50 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between mb-8 md:flex-row">
          <h1 className="text-3xl font-bold text-gray-800 font-display">
            My Courses
          </h1>

          {/* Large screen Add Course Button */}
          <button
            onClick={() => navigate("/courses/addcourses")}
            className="hidden px-6 py-2 text-sm font-medium text-white transition-all duration-200 rounded-lg shadow-md md:inline-flex bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add New Course
          </button>
        </div>

        {/* Small screen Add Course Button */}
        <div className="fixed bottom-6 right-6 lg:hidden">
          <button
            onClick={() => navigate("/courses/addcourses")}
            className="flex items-center justify-center p-4 text-white rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="text-xl">+</span>
          </button>
        </div>

        {courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="flex flex-col overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 truncate">
                      {course.courseName}
                    </h2>
                    {course.status && (
                      <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-50">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Subject
                        </p>
                        <p className="text-gray-800">{course.subjectName}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-indigo-50">
                        <Layers className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Progress
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-indigo-600 rounded-full"
                              style={{
                                width: `${
                                  ((course.chapters - course.pendingChapters) /
                                    course.chapters) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {course.chapters - course.pendingChapters}/
                            {course.chapters}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-purple-50">
                        <ClipboardList className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Task
                        </p>
                        <p className="text-gray-800">{course.task}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-amber-50">
                        <CalendarDays className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Deadline
                        </p>
                        <p className="text-gray-800">
                          {new Date(course.deadline).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50">
                  <div className="flex flex-col gap-2">
                    {course.pendingChapters > 0 ? (
                      <button
                        onClick={() => decreaseChapter(course._id)}
                        className="w-full px-4 py-2 text-sm font-medium text-white transition-all duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Complete 1 Chapter
                      </button>
                    ) : (
                      <button
                        className="w-full px-4 py-2 text-sm font-medium text-gray-400 bg-gray-200 rounded-md cursor-not-allowed"
                        disabled
                      >
                        All Chapters Completed
                      </button>
                    )}

                    {!course.status ? (
                      <button
                        onClick={() => markCourseAsCompleted(course._id)}
                        className="w-full px-4 py-2 text-sm font-medium text-white transition-all duration-200 bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Mark as Completed
                      </button>
                    ) : (
                      <button
                        className="w-full px-4 py-2 text-sm font-medium text-gray-400 bg-gray-200 rounded-md cursor-not-allowed"
                        disabled
                      >
                        Course Completed
                      </button>
                    )}

                    <button
                      onClick={() => deleteCourse(course._id)}
                      className="w-full px-4 py-2 text-sm font-medium text-white transition-all duration-200 bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-6 mb-4 bg-gray-100 rounded-full">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-800">
              No courses found
            </h3>
            <p className="max-w-md mb-6 text-gray-500">
              You haven't added any courses yet. Get started by adding your
              first course.
            </p>
            <button
              onClick={() => navigate("/courses/addcourses")}
              className="px-6 py-2 text-sm font-medium text-white transition-all duration-200 rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Your First Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
