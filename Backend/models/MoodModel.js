const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    mood: { type: String, required: true }, // e.g., "Happy"
    journal: [{ type: String }],
    habits: { type: Map, of: Boolean, default: {} },
  },
  { timestamps: true }
);

const Mood = mongoose.model("Mood", moodSchema);
module.exports = Mood;
