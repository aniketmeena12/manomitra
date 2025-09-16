const Problem = require("../models/problemModel");

// ➕ Add new problem/thread
const addProblem = async (req, res) => {
  try {
    const { text, mood, anonymous, category } = req.body;
    if (!text) return res.status(400).json({ message: "Problem text required" });

    const problem = await Problem.create({
      user: req.user._id,
      text,
      mood,
      anonymous,
      category,
    });

    res.status(201).json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📋 Get all problems/threads
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 }); // newest first
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 👍 React to a problem/thread
const reactProblem = async (req, res) => {
  try {
    const { threadId } = req.params;
    const { type } = req.body;

    const validTypes = ["like", "support", "sad"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid reaction type" });
    }

    const problem = await Problem.findById(threadId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    problem.reactions[type] += 1;
    await problem.save();

    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addProblem, getProblems, reactProblem };
