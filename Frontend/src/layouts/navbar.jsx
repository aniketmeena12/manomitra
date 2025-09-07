import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ProfileInfoCard from '../components/cards/ProfileinfoCard'

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='h-16 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30'>
        <div className='container mx-auto flex items-center justify-between gap-5'>
          {/* Logo */}
          <NavLink to="/" className="text-lg md:text-xl font-medium text-black leading-5">
            Manomitra
          </NavLink>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            <span className={`block h-0.5 w-6 bg-black mb-1 transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-black mb-1 transition-all ${open ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-black transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/resource-hub" className={({ isActive }) => isActive ? "text-amber-500 font-medium" : "text-black font-medium"}>
              Resource Hub
            </NavLink>
            <NavLink to="/Counselingsessons" className={({ isActive }) => isActive ? "text-amber-500 font-medium" : "text-black font-medium"}>
              Appointment Booking
            </NavLink>
            <NavLink to="/Community" className={({ isActive }) => isActive ? "text-amber-500 font-medium" : "text-black font-medium"}>
              Community
            </NavLink>
            <NavLink to="/moodtracker" className={({ isActive }) => isActive ? "text-amber-500 font-medium" : "text-black font-medium"}>
              MoodTracker
            </NavLink>
            <ProfileInfoCard />
          </div>
        </div>
      </div>
      {/* Mobile slider menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/70 backdrop-blur shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          &times;
        </button>
        <nav className="flex flex-col mt-16 gap-6 px-8">
          <NavLink to="/resource-hub" className="text-black font-medium" onClick={() => setOpen(false)}>
            Resource Hub
          </NavLink>
          <NavLink to="/Counselingsessons" className="text-black font-medium" onClick={() => setOpen(false)}>
            Appointment Booking
          </NavLink>
          <NavLink to="/Community" className="text-black font-medium" onClick={() => setOpen(false)}>
            Community
          </NavLink>
          <NavLink to="/moodtracker" className="text-black font-medium" onClick={() => setOpen(false)}>
            MoodTracker
          </NavLink>
        </nav>
        <div className="px-8 mt-8">
          <ProfileInfoCard />
        </div>
      </div>
      {/* Overlay removed for transparent background */}
      {open && (
        <div
          className="fixed inset-0 bg-transparent z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}

export default Navbar
