import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileInfoCard from "../components/cards/ProfileinfoCard";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-gray-800">
          Manomitra
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-amber-600 font-semibold" : "hover:text-amber-600"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resourcehub"
              className={({ isActive }) =>
                isActive ? "text-amber-600 font-semibold" : "hover:text-amber-600"
              }
            >
              Resource Hub
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Counselingsessons"
              className={({ isActive }) =>
                isActive ? "text-amber-600 font-semibold" : "hover:text-amber-600"
              }
            >
              Appointment Booking
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Community"
              className={({ isActive }) =>
                isActive ? "text-amber-600 font-semibold" : "hover:text-amber-600"
              }
            >
              Community
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/moodtracker"
              className={({ isActive }) =>
                isActive ? "text-amber-600 font-semibold" : "hover:text-amber-600"
              }
            >
              MoodTracker
            </NavLink>
          </li>
        </ul>

        {/* Profile Section */}
       <div className="hidden md:flex items-center gap-3">
  <ProfileInfoCard />
</div>


        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          <span
            className={`block h-0.5 w-6 bg-black mb-1 transition-all ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-black mb-1 transition-all ${
              open ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-black transition-all ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          &times;
        </button>

        <nav className="flex flex-col mt-16 gap-6 px-8 text-gray-700 font-medium">
          <NavLink
            to="/resourcehub"
            className={({ isActive }) =>
              isActive ? "text-amber-600 font-semibold" : ""
            }
            onClick={() => setOpen(false)}
          >
            Resource Hub
          </NavLink>
          <NavLink
            to="/counselingsessions"
            className={({ isActive }) =>
              isActive ? "text-amber-600 font-semibold" : ""
            }
            onClick={() => setOpen(false)}
          >
            Appointment Booking
          </NavLink>
          <NavLink
            to="/Community"
            className={({ isActive }) =>
              isActive ? "text-amber-600 font-semibold" : ""
            }
            onClick={() => setOpen(false)}
          >
            Community
          </NavLink>
          <NavLink
            to="/moodtracker"
            className={({ isActive }) =>
              isActive ? "text-amber-600 font-semibold" : ""
            }
            onClick={() => setOpen(false)}
          >
            MoodTracker
          </NavLink>
        </nav>

        {/* Mobile Profile */}
        <div className="px-8 mt-8 flex items-center gap-3">
  <ProfileInfoCard />
</div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
