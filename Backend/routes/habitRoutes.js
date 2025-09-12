const express = require("express");
const {
  registerUser,
  loginUser,
  getUserData,
  completeHabit,
} = require("../controllers/habitController"); // ✅ no .js if using CommonJS
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// Habits
router.get("/me", protect, getUserData);
router.post("/complete", protect, completeHabit);

module.exports = router; // ✅ CommonJS export
