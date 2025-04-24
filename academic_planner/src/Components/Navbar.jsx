import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For the mobile menu toggle
  const [showLogin, setShowLogin] = useState(true); // Track whether to show login or signup form
  const [isModalOpen, setIsModalOpen] = useState(false); // For the login/signup modal visibility

  const toggleMenu = () => setIsOpen(!isOpen); // Toggle mobile menu

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Timetable", path: "/timetable" },
    { name: "Suggestions", path: "/suggestions" },
    { name: "Courses", path: "/courses" },
  ];

  const openLoginModal = () => {
    setShowLogin(true); // Show login form
    setIsModalOpen(true); // Open the modal
  };

  const openSignupModal = () => {
    setShowLogin(false); // Show signup form
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl">
        <Link to="/" className="text-2xl font-bold tracking-wider text-primary">
          Academic Planner
        </Link>

        {/* Desktop Links */}
        <ul className="hidden space-x-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="text-black transition duration-300 hover:text-primary"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Login Button (Visible on Desktop and Mobile) */}
        <div className="hidden md:block">
          <button
            onClick={openLoginModal} // Only opens login modal
            className="font-medium text-black hover:text-primary"
          >
            Login
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden"
        } bg-white px-4 pb-4`}
      >
        <ul className="flex flex-col items-center pt-2 space-y-3 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)} // Close menu on link click
                className="block w-full py-1 text-black transition hover:text-primary"
              >
                {link.name}
              </Link>
            </li>
          ))}
          {/* Login Button in Mobile View */}
          <li>
            <button
              onClick={openLoginModal} // Only opens login modal
              className="font-medium text-black hover:text-primary"
            >
              Login
            </button>
          </li>
        </ul>
      </div>

      {/* Modal Popup for Login/Signup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            {showLogin ? (
              <Login switchToSignup={openSignupModal} closeModal={closeModal} />
            ) : (
              <Signup switchToLogin={openLoginModal} closeModal={closeModal} />
            )}
            <button
              onClick={closeModal}
              className="absolute text-gray-500 top-2 right-2"
            >
              X
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
