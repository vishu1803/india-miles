/**
 * Places Service
 * Fetches places from Supabase, with district-first fallback to state.
 */

import { supabase } from "@/lib/supabase";

/**
 * Fetches places matching user's district. Falls back to state if empty.
 *
 * @param {string} district - User's detected district.
 * @param {string} state - User's detected state.
 * @returns {Promise<Object>} { places: Array, matchType: "district"|"state"|"none" }
 */
export async function fetchNearbyPlaces(district, state) {
  // Step 1: Try district match first
  const { data: districtPlaces, error: districtError } = await supabase
    .from("places")
    .select("*")
    .eq("district", district);

  if (districtError) {
    throw new Error("Unable to fetch places. Please try again later.");
  }

  if (districtPlaces && districtPlaces.length > 0) {
    return { places: districtPlaces, matchType: "district" };
  }

  // Step 2: Fallback to state
  const { data: statePlaces, error: stateError } = await supabase
    .from("places")
    .select("*")
    .eq("state", state);

  if (stateError) {
    throw new Error("Unable to fetch places. Please try again later.");
  }

  if (statePlaces && statePlaces.length > 0) {
    return { places: statePlaces, matchType: "state" };
  }

  // No results at all
  return { places: [], matchType: "none" };
}
