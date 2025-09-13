import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function MoodOverview() {
  const [todayMood, setTodayMood] = useState(null);

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const res = await axios.get("/api/moods"); // your backend route
        const moods = res.data;
        const today = new Date().toISOString().split("T")[0];
        const todayEntry = moods.find((m) => m.date === today);
        setTodayMood(todayEntry?.mood || "Not tracked yet");
      } catch (err) {
        console.error("Error fetching moods:", err);
      }
    };
    fetchMood();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-3">
        <p className="text-lg font-medium">
          Today’s Mood:{" "}
          <span className="font-bold text-primary">
            {todayMood}
          </span>
        </p>
        <Button asChild>
          <a href="/dashboard/mood">View Full Tracker</a>
        </Button>
      </CardContent>
    </Card>
  );
}

export default MoodOverview;
