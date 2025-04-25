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
        console.log("Fetched courses:", data);
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
        backgroundColor: event.status ? "#4CAF50" : "#F44336",
        color: "white",
        borderRadius: "4px",
        padding: "0 4px",
      },
    };
  };

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">
        📅 My Course Deadlines
      </h1>
      <div style={{ height: "75vh" }}>
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
  );
};

export default CourseCalendar;
