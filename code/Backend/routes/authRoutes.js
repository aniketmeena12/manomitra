const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Auth only
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
