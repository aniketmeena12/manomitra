const Mood = require("../models/MoodModel");

// Save or update mood
const saveMood = async (req, res) => {
  const { date, mood } = req.body;
  try {
    const doc = await Mood.findOneAndUpdate(
      { user: req.user._id, date },
      { $set: { mood } },
      { upsert: true, new: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get moods
const getMoods = async (req, res) => {
  try {
    const docs = await Mood.find({ user: req.user._id }).sort({ date: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add journal entry
const addJournalEntry = async (req, res) => {
  const { date, entry } = req.body;
  try {
    const doc = await Mood.findOneAndUpdate(
      { user: req.user._id, date },
      { $push: { journal: entry } },
      { upsert: true, new: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle habit
const toggleHabit = async (req, res) => {
  const { date, habit, done } = req.body;
  try {
    const doc = await Mood.findOneAndUpdate(
      { user: req.user._id, date },
      { $set: { [`habits.${habit}`]: done } },
      { upsert: true, new: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  saveMood,
  getMoods,
  addJournalEntry,
  toggleHabit,
};
