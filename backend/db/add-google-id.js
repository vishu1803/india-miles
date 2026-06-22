require("dotenv").config();
const { pool } = require("./db");

async function migrate() {
  console.log("Migrating users table for Google OAuth...\n");

  try {
    // Add google_id column
    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS google_id text;
    `);
    console.log("✅ Added google_id column");

    // Make password nullable
    await pool.query(`
      ALTER TABLE users
      ALTER COLUMN password DROP NOT NULL;
    `);
    console.log("✅ Made password column nullable");

    console.log("\n🎉 Database migration complete!");
  } catch (err) {
    console.error("❌ Migration error:", err.message);
  } finally {
    await pool.end();
  }
}

migrate();
