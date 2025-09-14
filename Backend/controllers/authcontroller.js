const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Mood = require("../models/MoodModel");

// 🔑 Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// 📌 Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profilePic } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with defaults
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic: profilePic || "",
      bio: "",
      height: null,
      weight: null,
      psychCategory: "",
      wellnessPoints: 0,
      streak: 0,
      lastHabitDate: "",
      completedHabits: {},
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
};

// 📌 Get User Profile (protected)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get latest mood
    const latestMood = await Mood.findOne({ user: req.user._id })
      .sort({ createdAt: -1 })
      .exec();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio || "",
      profilePic: user.profilePic || "",
      height: user.height ?? null,
      weight: user.weight ?? null,
      psychCategory: user.psychCategory || "",
      wellnessPoints: user.wellnessPoints || 0,
      streak: user.streak || 0,
      currentMood: latestMood ? latestMood.mood : "",
    });
  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// 📌 Update User Profile (protected)
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
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
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
