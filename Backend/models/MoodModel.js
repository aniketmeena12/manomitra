const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  day: {
    type: String,
    required: true, 
  },
  mood: {
    type: Number,
    required: true, 
    min: 1,
    max: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mood", MoodSchema);
