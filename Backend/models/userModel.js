const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^(?:[a-zA-Z0-9_'^&\/+\-]+(?:\.[a-zA-Z0-9_'^&\/+\-]+)*|"(?:[^"]|\\")+")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
    },

    password: { type: String, required: true, minlength: 6 },

    bio: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    height: { type: Number, default: null },
    weight: { type: Number, default: null },
    psychCategory: { type: String, default: "" },

    // ✅ Habit Tracker Fields
    streak: { type: Number, default: 0 }, // consecutive days completed
    points: { type: Number, default: 0 }, // reward points earned
    completed: { type: [Number], default: [] }, // store habit IDs completed today
    lastDate: { type: String }, // YYYY-MM-DD of last habit completion reset
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

const User = mongoose.model("User", userSchema);
module.exports = User;
