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
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
    "#ffc0cb",
    "#ffb6c1",
    "#87ceeb",
  ];

  // const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <h1 className="mb-10 text-3xl font-bold text-center md:text-4xl text-primary">
        📊 Course Dashboard
      </h1>

      {courses.length > 0 ? (
        <>
          {/* Bar Chart Centered */}
          <div className="my-12 lg:min-h-screen lg:flex lg:items-center lg:justify-center">
            <div className="w-full">
              <h2 className="mb-6 text-xl font-bold text-center md:text-2xl text-primary">
                📚 Chapters per Course
              </h2>
              <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
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
          </div>

          {/* Pie Chart */}
          <div className="w-full my-12">
            <h2 className="mb-6 text-xl font-bold text-center md:text-2xl text-primary">
              ✅ Course Completion Status
            </h2>
            <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
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
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <p className="text-lg text-center text-gray-500 md:text-xl">
          No courses found.
        </p>
      )}
    </div>
  );
};

export default Dashboard;
