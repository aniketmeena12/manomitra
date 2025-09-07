import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/dashboardlayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Calendar, Users, BookOpen } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Fetch mood logs from backend when page loads
  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/mood");
      setMoodData(res.data);
    } catch (err) {
      console.error("Error fetching mood:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update today’s mood
  const handleMoodUpdate = async (value) => {
    const today = days[new Date().getDay()];
    try {
      const res = await axios.post("http://localhost:8000/api/mood", {
        day: today,
        mood: value,
      });
      setMoodData(res.data); // update chart instantly
    } catch (err) {
      console.error("Error updating mood:", err.response?.data || err.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white min-h-screen p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Welcome back, Aniket 👋</h2>
          <p className="text-gray-600">
            Here’s your mental wellness snapshot for the week.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Daily Wellness Quest */}
          <div className="bg-[#FFF8E1] shadow-md rounded-2xl p-4">
            <h3 className="font-bold text-lg mb-2">Daily Wellness Quest</h3>
            <p className="text-gray-600 mb-4">
              Complete a 2-min breathing exercise to earn points.
            </p>
            <button className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer">
              Start Exercise
            </button>
          </div>

          {/* Mood Tracker */}
          <div className="bg-[#FFF8E1] shadow-md rounded-2xl p-4">
            <h3 className="font-bold text-lg mb-2">Mood Tracker</h3>

            {loading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : moodData.every((d) => d.mood === 0) ? (
              <p className="text-gray-500 text-sm">
                No mood data logged yet — click a number below to start!
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 5]} />
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

            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleMoodUpdate(val)}
                  className="px-3 py-1 border border-amber-600 text-black rounded hover:bg-amber-100"
                >
                  {val}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Click a number to log today’s mood (1 = low, 5 = great).
            </p>
          </div>

          {/* Self Assessment */}
          <div className="bg-[#FFF8E1] shadow-md rounded-2xl p-4">
            <h3 className="font-bold text-lg mb-2">Self Assessment</h3>
            <p className="text-gray-600 mb-4">
              Check your mental wellness with a quick test.
            </p>
            <button className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer">
              Take Assessment
            </button>
          </div>

          {/* Next Appointment */}
          <div className="bg-[#FFF8E1] shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} />
              <h3 className="font-bold text-lg">Next Appointment</h3>
            </div>
            <p className="text-gray-600 mb-2">Counselor: Dr. Mehta</p>
            <p className="text-gray-800 font-semibold">Tomorrow, 5:00 PM</p>
            <button className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer">
              Join Session
            </button>
          </div>

          {/* Community Hub */}
          <div className="bg-[#FFF8E1] shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} />
              <h3 className="font-bold text-lg">Community Hub</h3>
            </div>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>“Coping with exam stress”</li>
              <li>“Meditation tips for beginners”</li>
              <li>“How I improved my sleep schedule”</li>
            </ul>
            <button className="mt-2 text-indigo-600 font-medium p-0">
              View More
            </button>
          </div>

          {/* Resources */}
          <div className="bg-[#FFF8E1] shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={18} />
              <h3 className="font-bold text-lg">Resources</h3>
            </div>
            <p className="text-gray-600 mb-2">
              Guided meditations, self-help articles, and videos.
            </p>
            <button className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer">
              Explore
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
