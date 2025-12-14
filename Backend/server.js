// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// DB connection
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");     // ✅ user login/register
const moodRoutes = require("./routes/moodroutes");   // ✅ mood tracking // ✅ habit tracker
const peerformRoutes = require("./routes/problemRoutes")  // ✅ peer problem sharing
const userRoutes = require("./routes/userRoutes"); // <-- use the correct file
const habitRoutes = require("./routes/habitRoutes");

const app = express();

// ✅ Security & CORS middleware
app.use(helmet());
app.use(
  cors({
    origin: "*", // ⚠️ change to frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Connect DB
connectDB();

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/forum", peerformRoutes); // <-- New Peerform API
app.use("/api/user", userRoutes); // mount only this for user endpoints

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
