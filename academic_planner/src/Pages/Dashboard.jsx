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

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold text-center text-primary">
        Course Dashboard
      </h1>

      {courses.length > 0 ? (
        <>
          <div className="my-8">
            <h2 className="mb-4 text-xl font-semibold text-center">
              Chapters per Course
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chapterData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="chapters" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="my-8">
            <h2 className="mb-4 text-xl font-semibold text-center">
              Course Completion Status
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No courses found.</p>
      )}
    </div>
  );
};

export default Dashboard;
