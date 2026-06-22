/**
 * Database Setup Script
 * Creates users and refresh_tokens tables.
 * Run: npm run setup:db
 */

require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function setup() {
  console.log("Setting up auth tables...\n");

  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        email text UNIQUE NOT NULL,
        password text NOT NULL,
        auth_provider text DEFAULT 'local',
        profile_picture text,
        created_at timestamp DEFAULT now()
      );
    `);
    console.log("✅ users table ready");

    // Create refresh_tokens table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        user_id uuid REFERENCES users(id) ON DELETE CASCADE,
        token text NOT NULL,
        expires_at timestamp,
        created_at timestamp DEFAULT now()
      );
    `);
    console.log("✅ refresh_tokens table ready");

    // Create index on refresh_tokens.token for fast lookups
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token
      ON refresh_tokens(token);
    `);
    console.log("✅ Index on refresh_tokens.token ready");

    // Create index on users.email for fast lookups
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email
      ON users(email);
    `);
    console.log("✅ Index on users.email ready");

    // Verify tables exist
    const result = await pool.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('users', 'refresh_tokens')
      ORDER BY table_name;
    `);
    console.log(
      "\nTables in database:",
      result.rows.map((r) => r.table_name).join(", "),
    );

    console.log("\n🎉 Database setup complete!");
  } catch (err) {
    console.error("❌ Setup error:", err.message);
  } finally {
    await pool.end();
  }
}

setup();
