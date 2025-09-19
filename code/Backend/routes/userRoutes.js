const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

// Profile only
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
