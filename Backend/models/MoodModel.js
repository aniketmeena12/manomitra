const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // linked to your User model
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD format
      required: true,
    },
    mood: {
      type: String, // e.g., "Happy", "Sad"
      required: true,
    },
    journal: [
      {
        type: String, // multiple journal entries per day
      },
    ],
    habits: {
      type: Map,
      of: Boolean, // { "sleep 8hrs": true, "exercise": false }
      default: {},
    },
  },
  { timestamps: true }
);

const Mood = mongoose.model("Mood", moodSchema);

module.exports = Mood;
