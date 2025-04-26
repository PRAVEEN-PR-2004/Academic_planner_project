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
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch courses");
        setCourses(await res.json());
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  // Data preparation
  const totalChapters = courses.reduce((sum, c) => sum + c.chapters, 0);
  const completedCourses = courses.filter((c) => c.status).length;
  const pendingCourses = courses.length - completedCourses;
  const completedChapters = courses.reduce(
    (sum, c) => sum + c.completedChapters,
    0
  );
  const pendingChapters = totalChapters - completedChapters;

  const chapterData = courses.map((c) => ({
    name: c.courseName,
    chapters: c.chapters,
    completedChapters: c.completedChapters,
    pendingChapters: c.chapters - c.completedChapters,
  }));

  const statusData = [
    { name: "Completed", value: completedCourses },
    { name: "Pending", value: pendingCourses },
  ];

  const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0"];

  return (
    <div className="min-h-screen px-6 pt-24 pb-12 bg-gray-100">
      <div className="mx-auto space-y-12 max-w-7xl">
        <h1 className="flex items-center justify-center gap-2 text-4xl font-extrabold text-center text-gray-800">
          📚 Course Dashboard
        </h1>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {[
            ["Total Courses", courses.length],
            ["Completed Courses", completedCourses],
            ["Pending Courses", pendingCourses],
            ["Total Chapters", totalChapters],
            ["Completed Chapters", completedChapters],
            ["Pending Chapters", pendingChapters],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center p-6 transition-all bg-white shadow rounded-2xl hover:shadow-lg"
            >
              <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                {label}
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Bar Chart */}
          <div className="p-6 bg-white shadow rounded-2xl">
            <div className="mb-4 text-lg font-semibold text-gray-700">
              📊 Chapters Overview
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chapterData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="chapters" name="Total" fill={COLORS[2]} />
                  <Bar
                    dataKey="completedChapters"
                    name="Completed"
                    fill={COLORS[0]}
                  />
                  <Bar
                    dataKey="pendingChapters"
                    name="Pending"
                    fill={COLORS[1]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="p-6 bg-white shadow rounded-2xl">
            <div className="mb-4 text-lg font-semibold text-gray-700">
              ✅ Course Completion Status
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {statusData.map((entry, i) => (
                      <Cell
                        key={`cell-${i}`}
                        fill={COLORS[i % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload && payload.length ? (
                        <div className="p-2 text-sm bg-white rounded shadow">
                          <p className="font-semibold">{payload[0].name}</p>
                          <p>Courses: {payload[0].value}</p>
                        </div>
                      ) : null
                    }
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
