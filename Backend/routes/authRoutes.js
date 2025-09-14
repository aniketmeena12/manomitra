const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authcontroller");
const { protect } = require("../middleware/authmiddleware");
const User = require("../models/userModel");
const Mood = require("../models/MoodModel");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

// UPDATE user profile
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update user fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.bio = req.body.bio || user.bio;
    user.profilePic = req.body.profilePic || user.profilePic;
    user.height = req.body.height || user.height;
    user.weight = req.body.weight || user.weight;
    user.psychCategory = req.body.psychCategory || user.psychCategory;

    if (req.body.streak !== undefined) user.streak = req.body.streak;
    if (req.body.wellnessPoints !== undefined)
      user.wellnessPoints = req.body.wellnessPoints;

    await user.save();

    // If mood provided → create a new mood entry
    if (req.body.currentMood) {
      await Mood.create({
        user: req.user._id,
        mood: req.body.currentMood,
        date: new Date().toISOString().slice(0, 10),
      });
    }

    // Return updated profile with latest mood
    const latestMood = await Mood.findOne({ user: req.user._id })
      .sort({ createdAt: -1 })
      .exec();

    res.json({
      ...user.toObject(),
      currentMood: latestMood ? latestMood.mood : "",
    });
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

module.exports = router;