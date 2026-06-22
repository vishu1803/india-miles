require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { testConnection } = require("./db/db");

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

// CORS — allow Next.js frontend to send cookies
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow any localhost or 127.0.0.1 origin in development
      if (
        !origin ||
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(null, process.env.FRONTEND_URL || "http://localhost:3000");
      }
    },
    credentials: true,
  }),
);

// Parse JSON bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Initialize Passport
require("./config/passport");
app.use(require("passport").initialize());

// ==========================================
// ROUTES
// ==========================================

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ==========================================
// ERROR HANDLING
// ==========================================

// Global error handler
app.use((err, req, res, next) => {
  console.error("[Server Error]", err.message);
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ==========================================
// START SERVER
// ==========================================

async function start() {
  // Test database connection
  const dbConnected = await testConnection();
  if (!dbConnected) {
    console.error("❌ Database connection failed. Exiting.");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`\n🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📦 Auth API: http://localhost:${PORT}/api/auth`);
    console.log(`💚 Health: http://localhost:${PORT}/api/health\n`);
  });
}

start();
