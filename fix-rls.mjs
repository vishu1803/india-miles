/**
 * Adds a SELECT RLS policy so the anon key can read places.
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fhjquepmmeguqhzkziqg.supabase.co";
const SUPABASE_SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoanF1ZXBtbWVndXFoemt6aXFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTk0ODM4MSwiZXhwIjoyMDk3NTI0MzgxfQ.PMnS8z0Ps9vPHtz6NxVt-6KIfe5JrV3BMm9SK-arUj8";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function addPolicy() {
  console.log("Adding RLS SELECT policy for anon users...\n");

  // Add a policy that allows anyone to SELECT from the places table
  const { error } = await supabase.rpc("exec_sql", {
    query: `
      CREATE POLICY IF NOT EXISTS "Allow public read access"
      ON public.places
      FOR SELECT
      USING (true);
    `,
  });

  if (error) {
    // If rpc doesn't work, try raw SQL via the REST endpoint
    console.log("RPC not available, trying direct SQL...");

    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `CREATE POLICY "Allow public read access" ON public.places FOR SELECT USING (true);`,
      }),
    });

    if (!response.ok) {
      console.log("   Could not add policy via API.");
      console.log("   Please add it manually in Supabase Dashboard:");
      console.log("   Table Editor → places → RLS → Add policy:");
      console.log('   Name: "Allow public read access"');
      console.log("   Policy: SELECT, USING expression: true");
      console.log("\n   OR run this SQL in the SQL Editor:");
      console.log(
        '   CREATE POLICY "Allow public read access" ON public.places FOR SELECT USING (true);'
      );
    } else {
      console.log("✅ Policy added successfully!");
    }
  } else {
    console.log("✅ Policy added successfully!");
  }

  // Test: try reading with anon key
  console.log("\nTesting read with anon key...");
  const anonClient = createClient(
    SUPABASE_URL,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoanF1ZXBtbWVndXFoemt6aXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDgzODEsImV4cCI6MjA5NzUyNDM4MX0.bxUaFMhDYESWa3jzdy61TaKfJjhJCapauE_rLpf32RA"
  );

  const { data, error: readError } = await anonClient
    .from("places")
    .select("id, name, district")
    .eq("district", "Gorakhpur")
    .limit(3);

  if (readError) {
    console.log("❌ Anon read FAILED:", readError.message);
    console.log("\n⚠️  You need to add a SELECT policy manually.");
    console.log("Go to Supabase Dashboard → SQL Editor and run:");
    console.log(
      'CREATE POLICY "Allow public read access" ON public.places FOR SELECT USING (true);'
    );
  } else {
    console.log(`✅ Anon read works! Got ${data.length} Gorakhpur places.`);
    data.forEach((p) => console.log(`   → ${p.name}`));
  }
}

addPolicy().catch(console.error);
