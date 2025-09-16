const express = require("express");
const { addProblem, getProblems, reactProblem } = require("../controllers/problemController");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

// ➕ Create new thread
router.post("/threads", protect, addProblem);

// 📋 Get all threads
router.get("/threads", protect, getProblems);

// 👍 React to thread
router.post("/threads/:threadId/reactions", protect, reactProblem);

module.exports = router;
