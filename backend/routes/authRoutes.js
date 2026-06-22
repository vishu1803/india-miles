const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refresh,
  logout,
  getMe,
  googleCallback,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const passport = require("passport");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=Google login failed`,
  }),
  googleCallback,
);

// Protected routes
router.get("/me", verifyToken, getMe);

module.exports = router;
