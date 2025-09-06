require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authroute");

const app = express();

// Security & CORS middleware
app.use(helmet());
app.use(
  cors({
    origin: "*", // adjust this in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect DB
connectDB();

// Body parser
app.use(express.json());

// Serve static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
// app.use('/api/sessions', sessionRoutes);
// app.use('/api/questions', questionRoutes);
// app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
// app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
