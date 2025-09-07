import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const MoodTrackerPage = () => {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/mood");
      setMoodData(res.data);
    } catch (err) {
      console.error("Error fetching moods:", err.response?.data || err.message);
    }
  };

  const moods = [
    { label: "😢 Sad", value: 1 },
    { label: "😐 Okay", value: 3 },
    { label: "😊 Happy", value: 5 },
    { label: "🤩 Excited", value: 7 },
  ];

  const logMood = async (value) => {
    const today = new Date();
    const day = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][today.getDay()];

    try {
      await axios.post("http://localhost:8000/api/mood", { day, mood: value });
      fetchMoods();
    } catch (err) {
      console.error("Error logging mood:", err.response?.data || err.message);
    }
  };

  const avgMood =
    moodData.length > 0
      ? (moodData.reduce((a, b) => a + b.mood, 0) / moodData.length).toFixed(1)
      : "N/A";

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Mood Tracker</h2>

      {/* Mood Buttons */}
      <div className="flex space-x-4 mb-6">
        {moods.map((m) => (
          <button
            key={m.value}
            onClick={() => logMood(m.value)}
            className="px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="mb-4">
        <p className="text-gray-700">Average Mood: <b>{avgMood}</b></p>
        <p className="text-gray-500 text-sm">Based on {moodData.length} entries</p>
      </div>

      {/* Full Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={moodData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Line type="monotone" dataKey="mood" stroke="#FFBF00" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodTrackerPage;
