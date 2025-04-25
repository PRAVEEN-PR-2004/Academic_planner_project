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

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.status ? "#16a34a" : "#dc2626", // green = complete, red = deadline
      color: "white",
      borderRadius: "6px",
      padding: "4px 6px",
      fontWeight: "500",
      fontSize: "0.75rem",
      overflowWrap: "break-word",
      lineHeight: 1.2,
    },
  });

  return (
    <div className="min-h-screen px-4 py-8 pt-16 bg-gray-50">
      <h1 className="mt-3 mb-10 text-xl font-bold text-center text-primary sm:text-2xl md:text-3xl lg:text-3xl">
        Manage Your Courses
      </h1>

      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <span className="inline-block w-4 h-4 bg-red-600 rounded-sm"></span>
            <span>Upcoming Deadline</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-4 h-4 bg-green-600 rounded-sm"></span>
            <span>Completed Task</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div
          className="w-full bg-white rounded-lg shadow-md sm:w-11/12 md:w-3/4 lg:w-2/3"
          style={{ minWidth: "300px", height: "75vh" }}
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={["month"]}
            defaultView="month"
            date={new Date(2025, 3, 1)} // April is month 3 (0-based index)
            toolbar={false}
            eventPropGetter={eventStyleGetter}
            popup
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCalendar;
