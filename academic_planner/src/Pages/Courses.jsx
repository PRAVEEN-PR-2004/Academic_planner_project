import React from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const cardData = [
    {
      title: "Add Course",
      description: "Add new academic courses to your planner.",
      btnText: "Add Now",
      btnColor: "bg-yellow-400 hover:bg-yellow-500",
      link: "/courses/addcourses",
    },
    {
      title: "View Courses",
      description: "Check your existing courses and details.",
      btnText: "View All",
      btnColor: "bg-yellow-400 hover:bg-yellow-500",
      link: "/courses/viewcourses", // Update with actual view route when ready
    },
    {
      title: "Delete Course",
      description: "Remove courses that are no longer needed.",
      btnText: "Delete",
      btnColor: "bg-red-500 hover:bg-red-600 text-white",
      link: "/courses/deletecourses", // Update with actual delete route when ready
    },
    {
      title: "Complete Courses",
      description: "Mark your finished courses and track completion status.",
      btnText: "Complete",
      btnColor: "bg-green-500 hover:bg-green-600 text-white",
      link: "/courses/completecourses", // Update with the actual route
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 pt-24 bg-gray-50">
      <h1 className="mb-12 text-2xl font-bold text-center lg:text-4xl lg:mb-16 text-primary">
        Manage Your Courses
      </h1>

      <div className="flex justify-center">
        <div className="grid gap-8 mt-8 lg:mt-16 sm:grid-cols-1 md:grid-cols-3 max-w-7xl">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex flex-col justify-between w-full h-64 p-8 transition bg-white shadow-md rounded-2xl hover:shadow-xl"
            >
              <div>
                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                  {card.title}
                </h2>
                <p className="text-gray-600">{card.description}</p>
              </div>
              <Link to={card.link}>
                <button
                  className={`mt-4 px-5 py-2 font-semibold rounded ${card.btnColor}`}
                >
                  {card.btnText}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
