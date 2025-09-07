import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

const DashboardMoodGraph = () => {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/mood");
      console.log("Mood API data:", res.data); // 👀 debug log
      setMoodData(res.data);
    } catch (err) {
      console.error("Error fetching moods:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Check if all moods are 0 or no data
  const hasData =
    moodData.length > 0 && moodData.some((entry) => entry.mood > 0);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-2">Mood (Last 7 days)</h3>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : !hasData ? (
        <p className="text-gray-500 text-sm">No mood data logged yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" fontSize={10} />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DashboardMoodGraph;
