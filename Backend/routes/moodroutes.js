const express = require("express");
const { saveMood, getMoods } = require("../controllers/moodController");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", protect, saveMood);   // Save or update mood
router.get("/", protect, getMoods);    // Fetch moods

module.exports = router;
