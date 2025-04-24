import React, { useEffect, useState } from "react";

const CompleteCourses = () => {
  const [courses, setCourses] = useState([]);
  // new: map courseId to array of completed chapter indexes
  const [completedMap, setCompletedMap] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/courses/myCourses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err.message);
      }
    };
    fetchCourses();
  }, []);

  const handleChapterComplete = (courseId, chapterIndex) => {
    setCompletedMap((prev) => {
      // get existing array or start fresh
      const done = prev[courseId] ? [...prev[courseId]] : [];
      if (!done.includes(chapterIndex)) done.push(chapterIndex);
      return { ...prev, [courseId]: done };
    });
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-center text-primary">
        Your Courses
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No courses found.
          </p>
        )}

        {courses.map((course) => {
          // for this course, which chapters are done?
          const done = completedMap[course._id] || [];

          return (
            <div
              key={course._id}
              className="p-5 bg-white border shadow rounded-xl"
            >
              <h2 className="mb-4 text-2xl font-semibold text-primary">
                {course.subjectName}
              </h2>

              <div className="space-y-3">
                {Array.from({ length: course.chapters }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-blue-50"
                  >
                    <span className="text-lg font-medium">
                      Chapter {idx + 1}
                    </span>

                    {done.includes(idx) ? (
                      <span className="text-2xl text-green-600">✓</span>
                    ) : (
                      <button
                        onClick={() => handleChapterComplete(course._id, idx)}
                        className="px-3 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompleteCourses;
