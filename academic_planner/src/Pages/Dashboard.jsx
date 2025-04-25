import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
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

        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []);

  const chapterData = courses.map((course) => ({
    name: course.courseName,
    chapters: course.chapters,
  }));

  const statusData = [
    { name: "Completed", value: courses.filter((c) => c.status).length },
    { name: "Pending", value: courses.filter((c) => !c.status).length },
  ];

  const COLORS = ["#7E57C2", "#FF8A65", "#4DB6AC", "#BA68C8"];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 pt-24 px-4">
      <div className="w-full mx-auto max-w-7xl">
        <h1 className="mb-10 text-xl font-bold text-center text-primary sm:text-2xl md:text-3xl lg:text-3xl">
          Manage Your Courses
        </h1>

        {courses.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {/* Info Cards */}
            <div className="p-4 text-center bg-white rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Total Courses</p>
              <h2 className="text-2xl font-bold">{courses.length}</h2>
            </div>
            <div className="p-4 text-center bg-white rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Completed Courses</p>
              <h2 className="text-2xl font-bold">{statusData[0].value}</h2>
            </div>
            <div className="p-4 text-center bg-white rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Pending Courses</p>
              <h2 className="text-2xl font-bold">{statusData[1].value}</h2>
            </div>
            <div className="p-4 text-center bg-white rounded-lg shadow-md">
              <p className="text-sm text-gray-500">Total Chapters</p>
              <h2 className="text-2xl font-bold">
                {courses.reduce((sum, c) => sum + c.chapters, 0)}
              </h2>
            </div>

            {/* Charts */}
            <div className="w-full col-span-2 p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-lg font-semibold text-purple-700">
                📚 Chapters per Course
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chapterData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="chapters">
                      {chapterData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="w-full col-span-2 p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-lg font-semibold text-purple-700">
                ✅ Course Completion Status
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="70%"
                      label
                    >
                      {statusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-20 text-lg text-center text-gray-500">
            No courses found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
