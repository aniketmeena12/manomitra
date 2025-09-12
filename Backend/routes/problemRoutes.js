const express = require("express");
const { addProblem, getProblems, reactProblem } = require("../controllers/problemController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ➕ Post new problem
router.post("/", protect, addProblem);

// 📋 Get all problems
router.get("/", protect, getProblems);

// 👍 React to problem
router.post("/react", protect, reactProblem);

module.exports = router;
