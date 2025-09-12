const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 🔑 Link to User model
      required: true,
    },
    text: { type: String, required: true },
    reactions: {
      like: { type: Number, default: 0 },
      support: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);
