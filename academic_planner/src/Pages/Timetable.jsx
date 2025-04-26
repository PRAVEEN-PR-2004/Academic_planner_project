import React, { useEffect, useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
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

const Timetable = () => {
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const today = new Date();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/courses/myCourses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then((data) => setCourses(data))
      .catch((err) => console.error("Fetch error:", err));
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
        title: `${c.courseName} - ${c.subjectName}`,
        start,
        end,
        status: c.status,
      });
    });

    if (completed.length) {
      const start = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        17,
        0
      );
      const end = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        18,
        0
      );
      blocks.push({
        title: `Review: ${completed
          .map((c) => `${c.courseName} (${c.subjectName})`)
          .join(", ")}`,
        start,
        end,
        status: true,
      });

      const revisionStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        19,
        0
      );
      const revisionEnd = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        20,
        0
      );
      blocks.push({
        title: `Revision: ${completed
          .map((c) => `${c.courseName} (${c.subjectName})`)
          .join(", ")}`,
        start: revisionStart,
        end: revisionEnd,
        status: true,
      });
    }

    setEvents(blocks);
  }, [courses]);

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.status ? "#4CAF50" : "#F44336",
      color: "white",
      borderRadius: "8px",
      padding: "8px 12px",
      fontWeight: "bold",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, transform 0.3s",
    },
  });

  const formattedDate = format(today, "EEEE MMM d");

  return (
    <div className="p-6 pt-24 mx-auto max-w-7xl">
      <h1 className="mb-10 text-xl font-bold text-center text-yellow-500 sm:text-2xl md:text-3xl lg:text-3xl">
        Daily Timetable
      </h1>

      <div className="mb-6 text-center">
        <p className="text-lg font-semibold text-gray-700">{formattedDate}</p>
      </div>

      <div style={{ height: "calc(100vh - 200px)" }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="day"
          views={["day"]}
          date={today}
          toolbar={false}
          min={new Date(0, 0, 0, 8, 0)}
          max={new Date(0, 0, 0, 20, 0)}
          step={60}
          timeslots={1}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  );
};

export default Timetable;
