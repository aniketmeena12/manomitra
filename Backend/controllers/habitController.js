const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Utility for date
const getToday = () => new Date().toISOString().split("T")[0];
const User = require("../models/userModel");

// 📌 Register User
 const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed, lastDate: getToday() });
    res.status(201).json({ message: "User registered", userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📌 Login User
 const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get User Data (with daily reset check)
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

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Complete a Habit
 const completeHabit = async (req, res) => {
  try {
    const { habitId, reward } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.completed.includes(habitId)) {
      user.completed.push(habitId);
      user.points += reward;

      // If all habits done → increase streak
      const TOTAL_HABITS = 9; // update if you add more habits
      if (user.completed.length === TOTAL_HABITS) {
        user.streak += 1;
      }

      await user.save();
    }

    res.json(user);
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
