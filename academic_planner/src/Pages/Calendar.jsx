import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CourseCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/courses/myCourses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        const evts = data
          .filter((c) => c.deadline)
          .map((c) => ({
            title: `${c.courseName} – ${c.task}`,
            start: new Date(c.deadline),
            end: new Date(c.deadline),
            allDay: true,
            status: c.status,
          }));
        setEvents(evts);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.status ? "#16a34a" : "#dc2626", // green/red
        color: "white",
        borderRadius: "6px",
        padding: "4px 6px",
        fontWeight: "500",
        fontSize: "0.75rem",
        overflowWrap: "break-word",
        lineHeight: 1.2,
      },
    };
  };

  return (
    <div className="min-h-screen px-2 py-8 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl p-4 mx-auto bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">
          📅 My Course Deadlines
        </h1>

        <div className="overflow-x-auto">
          <div style={{ minWidth: "600px", height: "75vh" }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
              views={["month", "week", "day"]}
              eventPropGetter={eventStyleGetter}
              popup
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCalendar;
