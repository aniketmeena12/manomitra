const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  day: { type: String, required: true }, // "Mon", "Tue", etc.
  mood: { type: Number, required: true }, // 1 to 5
  date: { type: Date, default: Date.now }, // for tracking
});

module.exports = mongoose.model("Mood", MoodSchema);
