// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user object to request (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// ✅ Middleware for appointment-specific access (e.g., only users can book)
const appointmentProtect = async (req, res, next) => {
  await protect(req, res, async () => {
    // Example: if in future you add roles (patient, doctor, admin)
    if (!req.user.role || req.user.role !== "patient") {
      return res.status(403).json({ message: "Only patients can book appointments" });
    }
    next();
  });
};

// ✅ Middleware for doctors to view/manage appointments
const doctorProtect = async (req, res, next) => {
  await protect(req, res, async () => {
    if (!req.user.role || req.user.role !== "doctor") {
      return res.status(403).json({ message: "Only doctors can manage appointments" });
    }
    next();
  });
};

module.exports = { protect, appointmentProtect, doctorProtect };