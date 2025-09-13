const express = require("express");
const Mood = require("../models/MoodModel");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// 📌 Get last 7 mood logs (per user)
router.get("/", protect, async (req, res) => {
  try {
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 6);

    const moods = await Mood.find({
      user: req.user._id, // ✅ filter by logged-in user
      date: { $gte: weekAgo },
    }).sort({ date: 1 });

    // Ensure all 7 days are included
    const weekData = days.map((day) => {
      const found = moods.find((m) => m.day === day);
      return { day, mood: found ? found.mood : 0 };
    });

    res.json(weekData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch mood data" });
  }
});

// 📌 Post/Update today’s mood (per user)
router.post("/", protect, async (req, res) => {
  try {
    const { day, mood } = req.body;

    if (!day || mood === undefined) {
      return res.status(400).json({ error: "Day and mood are required" });
    }

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    let moodLog = await Mood.findOneAndUpdate(
      { user: req.user._id, day, date: { $gte: startOfDay, $lte: endOfDay } },
      { mood },
      { new: true }
    );

    if (!moodLog) {
      moodLog = await Mood.create({ user: req.user._id, day, mood });
    }

    const weekAgo = new Date();
    weekAgo.setDate(new Date().getDate() - 6);
    const moods = await Mood.find({
      user: req.user._id,
      date: { $gte: weekAgo },
    }).sort({ date: 1 });

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
