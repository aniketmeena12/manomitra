import { useContext } from "react";
import { UserContext } from "@/context/usercontext";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Settings, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

export function DashboardHeader() {
  const { user, loading, clearUser } = useContext(UserContext);

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <header className="border-b px-6 py-4 bg-white">
        <p className="text-sm text-gray-500">Loading user...</p>
      </header>
    );
  }

  return (
    <header className="border-b border-[#A8D0E6] bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3  transition">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png" // replace with your logo path
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-xl font-semibold text-[#4A4A4A]">
            ManoMitra
          </h1>
        </div>
        </Link>
        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notification bell */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-[#4A4A4A]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 hover:bg-gray-100"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[#A8D0E6] text-[#4A4A4A]">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-[#4A4A4A]">
                  {user?.name || "Guest"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  clearUser(); // clear context
                  window.location.href = "/"; // redirect to landing
                }}
                className="text-red-600 focus:text-red-600"
                disabled={!user}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
