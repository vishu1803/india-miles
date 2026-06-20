/**
 * Debug script — checks Supabase connection and places table data.
 * Run with: node --experimental-modules debug-supabase.mjs
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fhjquepmmeguqhzkziqg.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoanF1ZXBtbWVndXFoemt6aXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDgzODEsImV4cCI6MjA5NzUyNDM4MX0.bxUaFMhDYESWa3jzdy61TaKfJjhJCapauE_rLpf32RA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function debug() {
  console.log("=== SUPABASE DEBUG ===\n");

  // 1. Test connection — count rows
  console.log("1. Testing connection & counting rows...");
  const { count, error: countError } = await supabase
    .from("places")
    .select("*", { count: "exact", head: true });

  if (countError) {
    console.error("   ❌ Connection/query error:", countError.message);
    console.error("   Details:", JSON.stringify(countError, null, 2));
    return;
  }
  console.log(`   ✅ Connected! Total rows in 'places' table: ${count}\n`);

  // 2. Fetch first 10 rows to see actual data
  console.log("2. Fetching first 10 rows...");
  const { data: sampleData, error: sampleError } = await supabase
    .from("places")
    .select("id, name, category, state, district, city, latitude, longitude")
    .limit(10);

  if (sampleError) {
    console.error("   ❌ Fetch error:", sampleError.message);
    return;
  }

  if (!sampleData || sampleData.length === 0) {
    console.log("   ⚠️  Table is EMPTY — no rows found!");
    console.log("   This is why 'No places found' is shown.");
    return;
  }

  console.log(`   Found ${sampleData.length} sample rows:`);
  sampleData.forEach((row, i) => {
    console.log(
      `   [${i + 1}] ${row.name} | ${row.district}, ${row.state} | (${row.latitude}, ${row.longitude})`
    );
  });

  // 3. List all unique districts
  console.log("\n3. Unique districts in database...");
  const { data: allPlaces, error: allError } = await supabase
    .from("places")
    .select("district, state");

  if (allError) {
    console.error("   ❌ Error:", allError.message);
    return;
  }

  const districts = [...new Set(allPlaces.map((p) => p.district))].sort();
  const states = [...new Set(allPlaces.map((p) => p.state))].sort();

  console.log(`   Districts: ${districts.join(", ")}`);
  console.log(`   States: ${states.join(", ")}`);

  // 4. Check for user's detected location (Gorakhpur / Uttar Pradesh from browser)
  const userDistrict = "Gorakhpur";
  const userState = "Uttar Pradesh";

  console.log(`\n4. Checking matches for user location...`);
  console.log(`   User district: "${userDistrict}"`);
  console.log(`   User state: "${userState}"`);

  const districtMatch = allPlaces.filter((p) => p.district === userDistrict);
  const stateMatch = allPlaces.filter((p) => p.state === userState);

  console.log(`   District matches: ${districtMatch.length}`);
  console.log(`   State matches: ${stateMatch.length}`);

  if (districtMatch.length === 0 && stateMatch.length === 0) {
    console.log(
      "\n   ⚠️  No matches for either district or state!"
    );
    console.log(
      "   The app correctly shows 'No places found' because the DB has no matching data."
    );

    // Check for case-sensitivity issues
    const districtCI = allPlaces.filter(
      (p) => p.district?.toLowerCase() === userDistrict.toLowerCase()
    );
    const stateCI = allPlaces.filter(
      (p) => p.state?.toLowerCase() === userState.toLowerCase()
    );
    if (districtCI.length > 0 || stateCI.length > 0) {
      console.log(
        "\n   🔍 CASE MISMATCH DETECTED! Found matches with case-insensitive search:"
      );
      console.log(`   District (case-insensitive): ${districtCI.length}`);
      console.log(`   State (case-insensitive): ${stateCI.length}`);
    }
  }

  console.log("\n=== DEBUG COMPLETE ===");
}

debug().catch(console.error);
