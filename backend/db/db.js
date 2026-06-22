const { Pool } = require("pg");

/**
 * PostgreSQL connection pool using Supabase connection string.
 * Uses direct PostgreSQL connection (NOT the Supabase JS client)
 * so we bypass RLS with the service_role connection.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/**
 * Execute a parameterized query.
 * @param {string} text - SQL query string with $1, $2 placeholders.
 * @param {Array} params - Query parameters.
 * @returns {Promise<Object>} Query result.
 */
async function query(text, params) {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;

  if (process.env.NODE_ENV !== "production") {
    console.log("[DB Query]", {
      text: text.substring(0, 80),
      duration: `${duration}ms`,
      rows: result.rowCount,
    });
  }

  return result;
}

/**
 * Test the database connection.
 * @returns {Promise<boolean>}
 */
async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Database connected:", result.rows[0].now);
    return true;
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    return false;
  }
}

module.exports = { query, pool, testConnection };
