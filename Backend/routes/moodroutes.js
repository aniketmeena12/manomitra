const express = require("express");
const Mood = require("../models/MoodModel")

const router = express.Router();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// 📌 Get last 7 mood logs
router.get("/", async (req, res) => {
  try {
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 6);

    const moods = await Mood.find({ date: { $gte: weekAgo } }).sort({ date: 1 });

    // Ensure all 7 days are returned
    const weekData = days.map((day) => {
      const found = moods.find((m) => m.day === day);
      return { day, mood: found ? found.mood : 0 };
    });

    res.json(weekData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch mood data" });
  }
});

// 📌 Post/Update today’s mood
router.post("/", async (req, res) => {
  try {
    const { day, mood } = req.body;

    if (!day || mood === undefined) {
      return res.status(400).json({ error: "Day and mood are required" });
    }

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Update if today’s mood already exists
    let moodLog = await Mood.findOneAndUpdate(
      { day, date: { $gte: startOfDay, $lte: endOfDay } },
      { mood },
      { new: true }
    );

    if (!moodLog) {
      moodLog = await Mood.create({ day, mood });
    }

    // Return updated weekly data
    const weekAgo = new Date();
    weekAgo.setDate(new Date().getDate() - 6);
    const moods = await Mood.find({ date: { $gte: weekAgo } }).sort({ date: 1 });

    const weekData = days.map((d) => {
      const found = moods.find((m) => m.day === d);
      return { day: d, mood: found ? found.mood : 0 };
    });

    res.json(weekData);
  } catch (err) {
    res.status(500).json({ error: "Failed to save mood" });
  }
});

module.exports = router;
