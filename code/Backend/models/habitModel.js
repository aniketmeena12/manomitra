const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: { type: String, default: "general" }, // e.g. health, study
    frequency: { type: String, default: "daily" }, // daily, weekly, etc.
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
