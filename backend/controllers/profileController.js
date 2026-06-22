const {
  getProfile,
  updateProfile,
  getStats,
} = require("../services/profileService");

/**
 * GET /api/profile
 * Get current user's profile.
 */
async function getUserProfile(req, res) {
  try {
    const profile = await getProfile(req.user.userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (err) {
    console.error("[Profile Get Error]", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile.",
    });
  }
}

/**
 * PUT /api/profile
 * Update current user's profile.
 */
async function updateUserProfile(req, res) {
  try {
    // Basic validation
    const { username, bio, home_state, home_city } = req.body;

    // Check if username is already taken (if updating)
    if (username) {
      // In a real production app we'd query to ensure username is unique,
      // but for now the DB UNIQUE constraint will catch duplicates.
    }

    const updatedProfile = await updateProfile(req.user.userId, {
      username,
      bio,
      home_state,
      home_city,
    });

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found to update.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      profile: updatedProfile,
    });
  } catch (err) {
    console.error("[Profile Update Error]", err.message);
    // Handle Postgres Unique Violation for username
    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Username is already taken.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
}

/**
 * GET /api/profile/stats
 * Get current user's travel stats.
 */
async function getUserStats(req, res) {
  try {
    const stats = await getStats(req.user.userId);

    if (!stats) {
      return res.status(404).json({
        success: false,
        message: "Stats not found.",
      });
    }

    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (err) {
    console.error("[Profile Stats Error]", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stats.",
    });
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserStats,
};
