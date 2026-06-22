const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getUserStats,
} = require("../controllers/profileController");
const { verifyToken } = require("../middleware/authMiddleware");

// All profile routes are protected
router.use(verifyToken);

router.get("/", getUserProfile);
router.put("/", updateUserProfile);
router.get("/stats", getUserStats);

module.exports = router;
