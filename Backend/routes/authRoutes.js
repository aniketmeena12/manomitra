const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile, // ✅ new controller method
} = require("../controllers/authcontroller"); // ⚠️ make sure the filename matches
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile); // ✅ now points to controller

module.exports = router;
