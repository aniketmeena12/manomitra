const express = require("express");
const { protect } = require("../middleware/authmiddleware");
const Habit = require("../models/habitModel");
const User = require("../models/userModel");

const router = express.Router();

// ✅ Mark habit complete
router.post("/complete", protect, async (req, res) => {
  try {
    const { habitId, reward } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date().toISOString().split("T")[0];

    // ✅ If user already completed this habit today → skip
    if (user.completedHabits?.[today]?.includes(habitId)) {
      return res.json({
        wellnessPoints: user.wellnessPoints,
        streak: user.streak,
      });
    }

    // ✅ If new day → check streak
    if (user.lastHabitDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      // If last completed day was yesterday → increase streak
      if (user.lastHabitDate === yesterdayStr) {
        user.streak += 1;
      } else {
        user.streak = 1; // reset streak
      }

      user.lastHabitDate = today;
      user.completedHabits[today] = [];
    }

    // ✅ Save completed habit
    if (!user.completedHabits[today]) user.completedHabits[today] = [];
    user.completedHabits[today].push(habitId);

    // ✅ Add points
    user.wellnessPoints += reward;

    await user.save();

    res.json({
      wellnessPoints: user.wellnessPoints,
      streak: user.streak,
    });
  } catch (err) {
    console.error("Habit Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
