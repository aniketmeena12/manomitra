import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function MoodOverview() {
  const [todayMood, setTodayMood] = useState("Not tracked yet");
  const [weekMoods, setWeekMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const token = localStorage.getItem("token");
        const resAll = await axios.get("http://localhost:8000/api/moods", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const moods = resAll.data;

        const last7 = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split("T")[0];
          const entry = moods.find((m) => m.date === dateStr);
          last7.push({ date: dateStr.slice(5), moodLabel: entry?.mood || "Not tracked yet" });
        }

        setWeekMoods(last7);
        setTodayMood(last7[6]?.moodLabel || "Not tracked yet");
      } catch (err) {
        console.error("Error fetching moods:", err);
      }
    };
    fetchMoods();
  }, []);

  return (
    <Card>
      <CardHeader><CardTitle>Mood Overview</CardTitle></CardHeader>
      <CardContent className="flex flex-col items-center space-y-3">
        <p>Today’s Mood: <b>{todayMood}</b></p>
        <div className="w-full h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weekMoods}>
              <XAxis dataKey="date" />
              <YAxis hide />
              <Tooltip formatter={(value, name, props) => weekMoods[props.dataIndex]?.moodLabel} />
              <Line type="monotone" dataKey="moodLabel" stroke="#6366f1" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <Button asChild><a href="/dashboard/mood">View Full Tracker</a></Button>
      </CardContent>
    </Card>
  );
}

export default MoodOverview;
