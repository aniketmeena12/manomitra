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
    const userEmail = email.toLowerCase(); // <-- always lowercase

    // Check if user exists
    const userExists = await User.findOne({ email: userEmail });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with defaults
    const user = await User.create({
      name,
      email: userEmail,
      password: hashedPassword,
      profilePic: profilePic || "",
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
    const email = req.body.email.toLowerCase(); // <-- always lowercase
    const { password } = req.body;
    console.log("Login attempt:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User found:", user.email, "Hashed password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

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
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// 📌 Get User Profile (protected)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

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

    console.log("REQ BODY:", req.body);

    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;
    user.bio = req.body.bio ?? user.bio;
    user.psychCategory = req.body.psychCategory ?? user.psychCategory;
    user.profilePic = req.body.profilePic ?? user.profilePic;

    // ✅ Ensure numbers/null stored correctly
    if (req.body.height !== undefined) {
      user.height =
        req.body.height === "" || req.body.height === null
          ? null
          : Number(req.body.height);
    }

    if (req.body.weight !== undefined) {
      user.weight =
        req.body.weight === "" || req.body.weight === null
          ? null
          : Number(req.body.weight);
    }

    await user.save();

    const latestMood = await Mood.findOne({ user: user._id })
      .sort({ createdAt: -1 })
      .exec();

    res.json({
      ...user.toObject(),
      currentMood: latestMood ? latestMood.mood : "",
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      message: "Server error updating profile",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
