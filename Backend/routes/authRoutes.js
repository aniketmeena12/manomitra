const express = require("express");
const {registerUser, loginUser, getUserProfile}= require("../controllers/authcontroller");
const {protect} = require("../middleware/authMiddleware.js");
const User = require("../models/userModel");

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile);

// UPDATE user profile
router.put("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.bio = req.body.bio || user.bio;
  user.profilePic = req.body.profilePic || user.profilePic;
  user.height = req.body.height || user.height;
  user.weight = req.body.weight || user.weight;
  user.psychCategory = req.body.psychCategory || user.psychCategory;

  await user.save();
  res.json(user);
});

module.exports = router