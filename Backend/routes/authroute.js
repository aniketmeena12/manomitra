const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authcontroller"); // ✅ make sure filename matches exactly
const upload = require("../middleware/uploadmiddleware");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

// 🔐 Auth Routes
router.post("/register", registerUser);        // Register User
router.post("/login", loginUser);              // Login User
router.get("/profile", protect, getUserProfile); // Get User Profile (protected)

// 📸 Image Upload Route
// 👉 add `protect` before `upload.single("image")` if you want only logged-in users to upload
router.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Build a public URL for the stored file
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    return res.status(200).json({
      imageUrl,
      filename: req.file.filename,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Upload failed",
      error: err.message,
    });
  }
});

module.exports = router;
