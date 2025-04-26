import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

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
            title: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                }}
              >
                {c.status ? (
                  <FaCheckCircle
                    color="#16a34a"
                    style={{
                      minWidth: "14px",
                      minHeight: "14px",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <FaExclamationCircle
                    color="#dc2626"
                    style={{
                      minWidth: "14px",
                      minHeight: "14px",
                      flexShrink: 0,
                    }}
                  />
                )}
                <span
                  style={{
                    wordBreak: "break-word",
                    textAlign: "center",
                  }}
                >
                  {c.subjectName}
                </span>
              </div>
            ),
            start: new Date(c.deadline),
            end: new Date(c.deadline),
            allDay: true,
            status: c.status,
          }));
        setEvents(evts);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: "transparent",
      color: "inherit",
      fontWeight: "500",
      fontSize: "0.85rem",
      display: "flex",
      alignItems: "center",
      border: "none",
    },
  });

  return (
    <div className="min-h-screen px-4 py-8 pt-16 bg-gray-50">
      <h1 className="mt-3 mb-10 text-xl font-bold text-center text-primary sm:text-2xl md:text-3xl lg:text-3xl">
        Deadlines Calender
      </h1>

      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <FaExclamationCircle className="text-red-600" />
            <span>Upcoming Deadline</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCheckCircle className="text-green-600" />
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
            date={new Date(2025, 3, 1)} // April is month 3 (0-based)
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
