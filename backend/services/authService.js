const bcrypt = require("bcryptjs");
const { query } = require("../db/db");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenUtils");

/**
 * Auth Service — handles all database operations for authentication.
 */

/**
 * Find a user by email.
 * @param {string} email
 * @returns {Promise<Object|null>} User row or null.
 */
async function findUserByEmail(email) {
  const result = await query("SELECT * FROM users WHERE email = $1", [
    email.toLowerCase().trim(),
  ]);
  return result.rows[0] || null;
}

/**
 * Find a user by ID (without password).
 * @param {string} userId
 * @returns {Promise<Object|null>}
 */
async function findUserById(userId) {
  const result = await query(
    "SELECT id, name, email, auth_provider, profile_picture, created_at FROM users WHERE id = $1",
    [userId],
  );
  return result.rows[0] || null;
}

/**
 * Create a new user.
 * @param {string} name
 * @param {string} email
 * @param {string} password - Plain text password (will be hashed).
 * @returns {Promise<Object>} Created user (without password).
 */
async function createUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await query(
    `INSERT INTO users (name, email, password, auth_provider)
     VALUES ($1, $2, $3, 'local')
     RETURNING id, name, email, auth_provider, profile_picture, created_at`,
    [name.trim(), email.toLowerCase().trim(), hashedPassword],
  );

  const user = result.rows[0];

  // Auto-create profile and stats
  await query(`INSERT INTO user_profiles (user_id, username) VALUES ($1, $2)`, [
    user.id,
    `user_${user.id.split("-")[0]}`,
  ]);
  await query(`INSERT INTO user_stats (user_id) VALUES ($1)`, [user.id]);

  return user;
}

/**
 * Compare a plain text password with a hashed password.
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
async function comparePassword(plainPassword, hashedPassword) {
  if (!hashedPassword) return false;
  return bcrypt.compare(plainPassword, hashedPassword);
}

/**
 * Find or create user via Google OAuth.
 * @param {Object} profile - Google profile
 * @returns {Promise<Object>} User object
 */
async function findOrCreateGoogleUser(profile) {
  const email = profile.emails[0].value.toLowerCase().trim();
  const name = profile.displayName;
  const googleId = profile.id;
  const picture =
    profile.photos && profile.photos[0] ? profile.photos[0].value : null;

  // Check if user already exists
  let user = await findUserByEmail(email);

  if (user) {
    // User exists. Update with Google details if not already present.
    // If they previously signed up with email/password, we just link their Google account
    if (
      user.google_id !== googleId ||
      user.profile_picture !== picture ||
      user.auth_provider !== "google"
    ) {
      await query(
        `UPDATE users 
         SET google_id = $1, profile_picture = COALESCE($2, profile_picture), auth_provider = 'google'
         WHERE id = $3`,
        [googleId, picture, user.id],
      );
      user.google_id = googleId;
      user.auth_provider = "google";
      if (picture) user.profile_picture = picture;
    }
    return user;
  }

  // User does not exist, create new Google user
  const result = await query(
    `INSERT INTO users (name, email, auth_provider, google_id, profile_picture)
     VALUES ($1, $2, 'google', $3, $4)
     RETURNING id, name, email, auth_provider, profile_picture, created_at`,
    [name, email, googleId, picture],
  );

  const newUser = result.rows[0];

  // Auto-create profile and stats
  await query(
    `INSERT INTO user_profiles (user_id, username, avatar_url) VALUES ($1, $2, $3)`,
    [newUser.id, `user_${newUser.id.split("-")[0]}`, picture],
  );
  await query(`INSERT INTO user_stats (user_id) VALUES ($1)`, [newUser.id]);

  return newUser;
}

/**
 * Generate both tokens and store the refresh token in the database.
 * @param {Object} user - { id, email }
 * @returns {Promise<Object>} { accessToken, refreshToken }
 */
async function generateTokensForUser(user) {
  const payload = { userId: user.id, email: user.email };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Calculate refresh token expiry (30 days from now)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  // Store refresh token in database
  await query(
    `INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES ($1, $2, $3)`,
    [user.id, refreshToken, expiresAt],
  );

  return { accessToken, refreshToken };
}

/**
 * Find a refresh token in the database.
 * @param {string} token
 * @returns {Promise<Object|null>}
 */
async function findRefreshToken(token) {
  const result = await query(
    "SELECT * FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()",
    [token],
  );
  return result.rows[0] || null;
}

/**
 * Delete a specific refresh token.
 * @param {string} token
 */
async function deleteRefreshToken(token) {
  await query("DELETE FROM refresh_tokens WHERE token = $1", [token]);
}

/**
 * Delete all refresh tokens for a user (logout from all devices).
 * @param {string} userId
 */
async function deleteAllUserRefreshTokens(userId) {
  await query("DELETE FROM refresh_tokens WHERE user_id = $1", [userId]);
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  comparePassword,
  findOrCreateGoogleUser,
  generateTokensForUser,
  findRefreshToken,
  deleteRefreshToken,
  deleteAllUserRefreshTokens,
};
