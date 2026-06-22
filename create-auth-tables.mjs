/**
 * Creates users and refresh_tokens tables in Supabase.
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fhjquepmmeguqhzkziqg.supabase.co";
const SUPABASE_SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoanF1ZXBtbWVndXFoemt6aXFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTk0ODM4MSwiZXhwIjoyMDk3NTI0MzgxfQ.PMnS8z0Ps9vPHtz6NxVt-6KIfe5JrV3BMm9SK-arUj8";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function createTables() {
  console.log("Creating auth tables...\n");

  // Create users table
  const { error: usersError } = await supabase.rpc("exec_sql", {
    query: `
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        email text UNIQUE NOT NULL,
        password text NOT NULL,
        auth_provider text DEFAULT 'local',
        profile_picture text,
        created_at timestamp DEFAULT now()
      );
    `,
  });

  if (usersError) {
    console.log("RPC not available — please run these SQL commands in Supabase SQL Editor:\n");
    console.log(`CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  auth_provider text DEFAULT 'local',
  profile_picture text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  token text NOT NULL,
  expires_at timestamp,
  created_at timestamp DEFAULT now()
);

-- RLS policies for backend service_role access
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE refresh_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access refresh_tokens" ON refresh_tokens FOR ALL USING (true) WITH CHECK (true);
`);
  } else {
    console.log("✅ Users table created");
  }
}

createTables().catch(console.error);
