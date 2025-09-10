import { NavLink } from "react-router-dom";
import { Home, BarChart, User, Settings, Book, Calendar, Group, Meh, Smile } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="h-screen w-16 border-r bg-white flex flex-col items-center py-4 shadow-sm">
      {/* Logo */}
      <div className="mb-6">
        <img
          src="/logo.png" // replace with your logo path
          alt="Logo"
          className="w-10 h-10 object-contain"
        />
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center justify-center w-10 h-10 rounded-lg transition  hover:bg-blue-100 ${
              isActive ? "bg-blue-100 text-blue-600" : "text-gray-500"
            }`
          }
        >
          <Home className="w-5 h-5" />
        </NavLink>

        <NavLink
          to="/resourcehub"
          className={({ isActive }) =>
            `flex items-center justify-center w-10 h-10 rounded-lg transition hover:bg-blue-100 ${
              isActive ? "bg-blue-100 text-blue-600" : "text-gray-500"
            }`
          }
        >
          <Book className="w-5 h-5" />
        </NavLink>
        <NavLink
          to="/community"
          className={({ isActive }) =>
            `flex items-center justify-center w-10 h-10 rounded-lg transition hover:bg-blue-100 ${
              isActive ? "bg-blue-100 text-blue-600" : "text-gray-500"
            }`
          }
        >
          <Group className="w-5 h-5" />
        </NavLink>
        <NavLink
          to="/counselingsessions"
          className={({ isActive }) =>
            `flex items-center justify-center w-10 h-10 rounded-lg transition hover:bg-blue-100 ${
              isActive ? "bg-blue-100 text-blue-600" : "text-gray-500"
            }`
          }
        >
          <Calendar className="w-5 h-5" />
        </NavLink>
        <NavLink
          to="/moodtracker"
          className={({ isActive }) =>
            `flex items-center justify-center w-10 h-10 rounded-lg transition hover:bg-blue-100  ${
              isActive ? "bg-blue-100 text-blue-600" : "text-gray-500"
            }`
          }
        >
          <Smile className="w-5 h-5" />
        </NavLink>
        
      </nav>

      {/* Spacer + bottom items */}
      <div className="flex-1" />
    </aside>
  );
};

export default Sidebar;
