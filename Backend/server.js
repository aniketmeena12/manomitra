require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

// DB connection
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authroute");
const moodRoutes = require("./routes/moodroutes"); // ✅ CommonJS import

const app = express();

// ✅ Security & CORS middleware
app.use(helmet());
app.use(
  cors({
    origin: "*", // ⚠️ Set your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Connect DB
connectDB();

// ✅ Body parser
app.use(express.json());

// ✅ Static file serving (uploads, profile images, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/mood", moodRoutes); // <-- mood tracking API

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("✅ Manomitra Backend is Running...");
});

// ✅ Error handler middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
