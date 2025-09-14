const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match:
        /^(?:[a-zA-Z0-9_'^&\/+\-]+(?:\.[a-zA-Z0-9_'^&\/+\-]+)*|"(?:[^"]|\\")+")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
    },
    password: { type: String, required: true, minlength: 6 },

    // Optional Profile Fields
    bio: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    height: { type: Number, default: null },
    weight: { type: Number, default: null },
    psychCategory: { type: String, default: "" },

    // ✅ Habit Tracker & Wellness
    streak: { type: Number, default: 0 },
    wellnessPoints: { type: Number, default: 0 },
    completed: { type: [String], default: [] }, // store habit IDs as strings
    lastDate: { type: String }, // YYYY-MM-DD
  },
  { timestamps: true }
);

// 🔑 Hash password before save if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔑 Compare password helper
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// 🔑 Optional helper: reset daily habits if new day
userSchema.methods.resetDailyHabits = function (today) {
  if (this.lastDate !== today) {
    this.completed = [];
    this.lastDate = today;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
