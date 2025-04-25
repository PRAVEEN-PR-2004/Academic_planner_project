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

  // 1) Fetch courses from your backend API
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

  // 2) Build today’s study blocks
  useEffect(() => {
    if (!courses.length) return;

    const today = new Date();
    const pending = courses.filter((c) => !c.status);
    const completed = courses.filter((c) => c.status);
    const blocks = [];

    // 2-hour blocks for each pending course
    pending.forEach((c, i) => {
      const startHour = 8 + i * 2; // 8 AM, 10 AM, 12 PM, …
      if (startHour + 2 > 20) return; // don’t exceed 8 PM
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
        title: `${c.courseName} - ${c.subjectName}`, // Display courseName and subjectName
        start,
        end,
        status: c.status,
      });
    });

    // Single 1-hour review block at 5 PM for all completed courses
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
          .join(", ")}`, // Show subjectName in review title
        start,
        end,
        status: true,
      });

      // 1-hour revision block at 7 PM for completed courses
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
          .join(", ")}`, // Show subjectName in revision title
        start: revisionStart,
        end: revisionEnd,
        status: true,
      });
    }

    setEvents(blocks);
  }, [courses]);

  // 3) Color code: red = pending, green = done
  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.status ? "#4CAF50" : "#F44336",
      color: "white",
      borderRadius: "4px",
      padding: "0 4px",
    },
  });

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">
        🗓️ Today’s Study Timetable
      </h1>
      <div style={{ height: "75vh" }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="day"
          views={["day"]}
          min={new Date(0, 0, 0, 8, 0)} // 8:00 AM
          max={new Date(0, 0, 0, 20, 0)} // 8:00 PM
          eventPropGetter={eventStyleGetter}
          step={60} // 60-minute slots
          timeslots={1} // one slot per hour
        />
      </div>
    </div>
  );
};

export default Timetable;
