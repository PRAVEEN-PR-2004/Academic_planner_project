import React, { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Clock, AlertCircle } from "lucide-react";
import format from "date-fns/format";

const Timetable = () => {
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    fetch("http://localhost:5000/courses/myCourses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then((data) => setCourses(data))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!courses.length) return;

    const pending = courses.filter((c) => !c.status);
    const completed = courses.filter((c) => c.status);
    const blocks = [];

    pending.forEach((c, i) => {
      const startHour = 8 + i * 2;
      if (startHour + 2 > 20) return;
      const start = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        startHour,
        0
      );
      const end = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        startHour + 2,
        0
      );
      blocks.push({
        title: `${c.courseName}`,
        subject: c.subjectName,
        start,
        end,
        status: c.status,
        course: c,
        type: "study",
      });
    });

    if (completed.length) {
      blocks.push({
        title: "Review Session",
        subject: completed.map((c) => c.courseName).join(", "),
        start: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          17,
          0
        ),
        end: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          18,
          0
        ),
        status: true,
        type: "review",
      });

      blocks.push({
        title: "Revision Time",
        subject: completed.map((c) => c.courseName).join(", "),
        start: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          19,
          0
        ),
        end: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          20,
          0
        ),
        status: true,
        type: "revision",
      });
    }

    setEvents(blocks.sort((a, b) => a.start - b.start));
  }, [courses]);

  const formattedDate = format(today, "EEEE, MMMM d, yyyy");

  const getEventIcon = (type) => {
    switch (type) {
      case "review":
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case "revision":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getTimeSlotHeight = (start, end) => {
    const duration = (end - start) / (1000 * 60 * 60); // duration in hours
    return `${duration * 80}px`; // 80px per hour
  };

  return (
    <div className="max-w-4xl min-h-screen p-4 pt-32 mx-auto sm:p-6 lg:mt-14">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold lg:text-3xl text-primary">
          Daily Study Planner
        </h1>
        <p className="mt-2 text-lg text-gray-600">{formattedDate}</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline */}
          <div
            className="absolute left-0 h-full border-r-2 border-gray-200"
            style={{ left: "50px" }}
          ></div>

          {/* Time markers */}
          <div
            className="absolute left-0 w-full"
            style={{ top: "-20px", left: "50px" }}
          >
            {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
              <div
                key={hour}
                className="absolute text-xs text-gray-500"
                style={{ top: `${(hour - 8) * 80}px`, left: "-40px" }}
              >
                {hour <= 12 ? `${hour} AM` : `${hour - 12} PM`}
              </div>
            ))}
          </div>

          {/* Events */}
          <div className="relative" style={{ marginLeft: "70px" }}>
            {events.map((event, index) => (
              <div
                key={index}
                className={`absolute w-full rounded-lg p-4 mb-2 shadow-md ${
                  event.status
                    ? "bg-green-50 border-l-4 border-green-500"
                    : "bg-yellow-50 border-l-4 border-yellow-500"
                }`}
                style={{
                  top: `${
                    (event.start.getHours() - 8) * 80 +
                    (event.start.getMinutes() / 60) * 80
                  }px`,
                  height: getTimeSlotHeight(event.start, event.end),
                }}
              >
                <div className="flex items-start">
                  <div className="mt-1 mr-3">{getEventIcon(event.type)}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.subject}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {format(event.start, "h:mm a")} -{" "}
                      {format(event.end, "h:mm a")}
                    </p>
                    {event.type === "study" && !event.status && (
                      <span className="inline-block px-2 py-1 mt-2 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-12 space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-700">Pending Courses</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-700">Completed Courses</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-700">Review Session</span>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
