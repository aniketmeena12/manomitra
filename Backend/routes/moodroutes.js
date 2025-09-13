const express = require("express");
const {
  saveMood,
  getMoods,
  addJournalEntry,
  toggleHabit,
} = require("../controllers/moodController");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

// Save or update mood
router.post("/", protect, saveMood);

// Fetch moods
router.get("/", protect, getMoods);

// Add journal entry
router.post("/journal", protect, addJournalEntry);

// Toggle habit
router.post("/habit", protect, toggleHabit);

module.exports = router;
