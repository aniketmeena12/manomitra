import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const MOOD_LABELS = {
  Happy: 5,
  Calm: 4,
  Neutral: 3,
  Sad: 2,
  Angry: 1,
  "Not tracked yet": 0,
};

function MoodOverview() {
  const [todayMood, setTodayMood] = useState("Not tracked yet");
  const [weekMoods, setWeekMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {  
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/moods/today", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodayMood(res.data.mood || "Not tracked yet");

        const resAll = await axios.get("/api/moods", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const moods = resAll.data;

        // Get last 7 days
        const last7 = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split("T")[0];
          const entry = moods.find((m) => m.date === dateStr);
          last7.push({
            date: dateStr.slice(5), // MM-DD
            mood: MOOD_LABELS[entry?.mood] ?? 0,
            moodLabel: entry?.mood || "Not tracked yet",
          });
        }
        setWeekMoods(last7);
      } catch (err) {
        console.error("Error fetching moods:", err);
      }
    };
    fetchMoods();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-3">
        <p className="text-lg font-medium">
          Today’s Mood:{" "}
          <span className="font-bold text-primary">{todayMood}</span>
        </p>
        <div className="w-full h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weekMoods}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
              <Tooltip
                formatter={(value, name, props) =>
                  weekMoods[props.dataIndex]?.moodLabel
                }
              />
              <Line type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <Button asChild>
          <a href="/dashboard/mood">View Full Tracker</a>
        </Button>
      </CardContent>
    </Card>
  );
}

export default MoodOverview;
