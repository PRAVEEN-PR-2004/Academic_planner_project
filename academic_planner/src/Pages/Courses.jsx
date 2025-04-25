import React from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const cardData = [
    {
      title: "Add Course",
      description:
        "Add new academic courses to your planner with important information like deadlines, credits, and instructors.",
      btnText: "Add Now",
      btnColor: "bg-yellow-400 hover:bg-yellow-500 text-gray-900",
      link: "/courses/addcourses",
    },
    {
      title: "View Courses",
      description:
        "Browse and manage all the courses you’ve added. See course details and upcoming deadlines at a glance.",
      btnText: "View All",
      btnColor: "bg-yellow-400 hover:bg-yellow-500 text-gray-900",
      link: "/courses/viewcourses",
    },
    {
      title: "Delete Course",
      description:
        "Clean up your planner by removing outdated or irrelevant courses. Keep your dashboard focused.",
      btnText: "Delete",
      btnColor: "bg-red-500 hover:bg-red-600 text-white",
      link: "/courses/deletecourses",
    },
    {
      title: "Complete Courses",
      description:
        "Mark courses as completed once you finish them. Track your progress and celebrate milestones.",
      btnText: "Complete",
      btnColor: "bg-green-500 hover:bg-green-600 text-white",
      link: "/courses/completecourses",
    },
  ];

  return (
    <div className="min-h-screen px-4 pt-28 sm:px-6 lg:px-8 bg-gray-50">
      <h1 className="mb-10 text-xl font-bold text-center text-primary sm:text-2xl md:text-3xl lg:text-3xl">
        Manage Your Courses
      </h1>

      <div className="grid max-w-6xl gap-6 mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="flex flex-col justify-between h-[300px] p-6 transition-shadow duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl"
          >
            <div>
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                {card.title}
              </h2>
              <p className="text-sm leading-relaxed text-gray-600">
                {card.description}
              </p>
            </div>
            <Link to={card.link}>
              <button
                className={`w-full py-2 rounded-xl text-sm font-semibold transition duration-200 ${card.btnColor}`}
              >
                {card.btnText}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
