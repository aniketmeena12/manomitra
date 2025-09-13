import React, { useState, useEffect, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Calendar, Users, BookOpen, Smile } from "lucide-react";
import axios from "axios";
import { UserContext } from "@/context/usercontext";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  // Map mood numbers → emojis
  const moodMap = {
    1: "😞",
    2: "😐",
    3: "🙂",
    4: "😊",
    5: "🤩",
  };

  // Fetch moods on mount
  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/moods", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Mood API Response:", res.data);
      // transform for recharts
      const formatted = res.data.map((m) => ({
        date: m.date,
        mood: m.mood,
      }));
      setMoodData(formatted);
    } catch (err) {
      console.error("Error fetching mood:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodUpdate = async (value) => {
    const today = new Date().toISOString().split("T")[0];
    try {
      const res = await axios.post(
        "http://localhost:8000/api/moods",
        { date: today, mood: value },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      console.log("Mood POST Response:", res.data);
      fetchMoods(); // refresh after update
    } catch (err) {
      console.error("Error updating mood:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 style={{ color: "#4A4A4A" }}>
          {user ? `Welcome back, ${user.name.split(" ")[0]} 👋` : "Welcome 👋"}
        </h2>
        <p className="text-gray-600">
          Here’s your mental wellness snapshot for the week.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="bg-[rgb(255,255,255,0.6)] rounded-xl p-5 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Daily Wellness Quest */}
          <div className="bg-[rgb(228,217,255,0.3)] shadow-md rounded-2xl p-4">
            <h3 className="font-bold text-lg mb-2">Daily Wellness Quest</h3>
            <p className="text-gray-600 mb-4">
              Complete a 2-min breathing exercise to earn points.
            </p>
            <NavLink
              to="/breathing"
              className="inline-block bg-[#341688] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-[#9470f6] hover:text-black border transition-colors cursor-pointer"
            >
              Start Exercise
            </NavLink>
          </div>

          {/* Mood Tracker Overview */}
          <div className="bg-[rgb(244,244,175,0.5)] shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Smile size={18} />
              <h3 className="font-bold text-lg">Mood Tracker</h3>
            </div>

            {loading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : moodData.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No mood data logged yet — click a mood below to start!
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#FFBF00"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {/* Mood Buttons */}
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleMoodUpdate(val)}
                  className="px-3 py-2 border border-amber-600 rounded hover:bg-amber-100 text-xl"
                >
                  {moodMap[val]}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Tap an emoji to log today’s mood.
            </p>

            {/* Link to full page */}
            <NavLink
              to="/moodtracker"
              className="inline-block mt-3 text-indigo-600 font-medium"
            >
              View Full Tracker →
            </NavLink>
          </div>

          {/* Self Assessment */}
          <div className="bg-[rgb(224,215,215,0.5)] shadow-md rounded-2xl p-4">
            <h3 className="font-bold text-lg mb-2">Self Assessment</h3>
            <p className="text-gray-600 mb-4">
              Check your mental wellness with a quick test.
            </p>
            <NavLink
              to="/selfassestments"
              className="inline-block bg-[#341688] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-[#9470f6] hover:text-black border transition-colors cursor-pointer"
            >
              Click to Evaluate
            </NavLink>
          </div>

          {/* Next Appointment */}
          <div className="bg-[rgb(231,182,204,0.4)] shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} />
              <h3 className="font-bold text-lg">Next Appointment</h3>
            </div>
            <p className="text-gray-600 mb-2">Counselor: Dr. Mehta</p>
            <p className="text-gray-800 font-semibold">Tomorrow, 5:00 PM</p>
            <button className="bg-[#341688] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-[#9470f6] hover:text-black border transition-colors cursor-pointer">
              Join Session
            </button>
          </div>

          {/* Community Hub */}
          <div className="bg-[rgb(159,228,212,0.3)] shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} />
              <h3 className="font-bold text-lg">Community Hub</h3>
            </div>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>“Coping with exam stress”</li>
              <li>“Meditation tips for beginners”</li>
              <li>“How I improved my sleep schedule”</li>
            </ul>
            <NavLink
              to="/community"
              className="mt-2 text-indigo-600 font-medium p-0"
            >
              View More
            </NavLink>
          </div>

          {/* Resources */}
          <div className="bg-[rgb(207,165,226,0.4)] shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={18} />
              <h3 className="font-bold text-lg">Resources</h3>
            </div>
            <p className="text-gray-600 mb-2">
              Guided meditations, self-help articles, and videos.
            </p>
            <NavLink
              to="/resourcehub"
              className="inline-block bg-[#341688] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-[#9470f6] hover:text-black border transition-colors cursor-pointer"
            >
              Explore
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
