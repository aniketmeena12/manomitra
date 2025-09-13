const Mood = require("../models/MoodModel");

// @desc Save or update mood for a date
// @route POST /api/moods
// @access Private
const saveMood = async (req, res) => {
  try {
    const { date, mood, journal, habits } = req.body;

    let entry = await Mood.findOne({ user: req.user._id, date });

    if (entry) {
      // update existing
      entry.mood = mood || entry.mood;
      if (journal) entry.journal.push(journal);
      if (habits) entry.habits = { ...entry.habits, ...habits };
      await entry.save();
    } else {
      // create new
      entry = await Mood.create({
        user: req.user._id,
        date,
        mood,
        journal: journal ? [journal] : [],
        habits: habits || {},
      });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error("Save Mood Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all moods of logged-in user
// @route GET /api/moods
// @access Private
const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id }).sort({ date: 1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { saveMood, getMoods };