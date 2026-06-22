/**
 * Database Setup Script for Profiles
 * Creates user_profiles and user_stats tables.
 * Run: node db/setup-profiles.js
 */

require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function setupProfiles() {
  console.log("Setting up user_profiles and user_stats tables...\n");

  try {
    // Create user_profiles table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        username text UNIQUE,
        bio text,
        country text DEFAULT 'India',
        home_state text,
        home_city text,
        avatar_url text,
        created_at timestamp DEFAULT now(),
        updated_at timestamp DEFAULT now()
      );
    `);
    console.log("✅ user_profiles table ready");

    // Create user_stats table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_stats (
        user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        total_places integer DEFAULT 0,
        total_states integer DEFAULT 0,
        total_districts integer DEFAULT 0,
        badge_level text DEFAULT 'Beginner',
        created_at timestamp DEFAULT now()
      );
    `);
    console.log("✅ user_stats table ready");

    // Create indexes for quick lookups
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_user_profiles_username
      ON user_profiles(username);
    `);
    console.log("✅ Index on user_profiles.username ready");

    console.log("\n🎉 Profile database setup complete!");
  } catch (err) {
    console.error("❌ Setup error:", err.message);
  } finally {
    await pool.end();
  }
}

setupProfiles();
