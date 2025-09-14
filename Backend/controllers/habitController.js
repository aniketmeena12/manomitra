const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const updateStreak = require("../utils/streakhelper");

// Utility for date
const getToday = () => new Date().toISOString().split("T")[0];

// 📌 Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, lastDate: getToday() });
    res.status(201).json({ message: "User registered", userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📌 Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get User Data
const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const today = getToday();

    // Reset habits if new day
    if (user.lastDate !== today) {
      user.completed = [];
      user.lastDate = today;
      await user.save();
    }

    res.json({
      name: user.name,
      email: user.email,
      streak: user.streak,
      wellnessPoints: user.wellnessPoints,
      completed: user.completed,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Complete a Habit
const completeHabit = async (req, res) => {
  try {
    const { habitId, reward } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.completed.includes(habitId.toString())) {
      user.completed.push(habitId.toString());

      // Update streak & wellness points using streakHelper
      const result = await updateStreak(user._id, reward);

      await user.save();

      res.json({
        streak: result.streak,
        wellnessPoints: result.wellnessPoints,
        completed: user.completed,
      });
    } else {
      res.status(400).json({ message: "Habit already completed today" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  completeHabit,
};
