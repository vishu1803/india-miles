const { query } = require("../db/db");

/**
 * Profile Service — handles database operations for user profiles and stats.
 */

/**
 * Get a user's complete profile (users + user_profiles + user_stats).
 * @param {string} userId
 */
async function getProfile(userId) {
  const result = await query(
    `SELECT 
      u.id, u.name, u.email, u.auth_provider, 
      p.username, p.bio, p.country, p.home_state, p.home_city, COALESCE(p.avatar_url, u.profile_picture) as avatar_url,
      s.total_places, s.total_states, s.total_districts, s.badge_level
     FROM users u
     LEFT JOIN user_profiles p ON u.id = p.user_id
     LEFT JOIN user_stats s ON u.id = s.user_id
     WHERE u.id = $1`,
    [userId],
  );
  return result.rows[0] || null;
}

/**
 * Update a user's profile.
 * @param {string} userId
 * @param {Object} data - { username, bio, home_state, home_city }
 */
async function updateProfile(userId, data) {
  const { username, bio, home_state, home_city } = data;

  // Update only the provided fields
  const result = await query(
    `UPDATE user_profiles 
     SET 
       username = COALESCE($1, username),
       bio = COALESCE($2, bio),
       home_state = COALESCE($3, home_state),
       home_city = COALESCE($4, home_city),
       updated_at = NOW()
     WHERE user_id = $5
     RETURNING *`,
    [username, bio, home_state, home_city, userId],
  );

  return result.rows[0];
}

/**
 * Get a user's stats.
 * @param {string} userId
 */
async function getStats(userId) {
  const result = await query(`SELECT * FROM user_stats WHERE user_id = $1`, [
    userId,
  ]);
  return result.rows[0] || null;
}

module.exports = {
  getProfile,
  updateProfile,
  getStats,
};
