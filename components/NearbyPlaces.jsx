"use client";

import { useState, useEffect } from "react";
import { fetchNearbyPlaces } from "@/services/placesService";
import { calculateDistance } from "@/utils/distance";
import { getCache, saveCache } from "@/lib/cacheManager";
import PlacesList from "./PlacesList";

/**
 * NearbyPlaces Component
 * Fetches places from Supabase, calculates distances, sorts by nearest first.
 * Uses smart caching and 500m movement thresholds.
 */
export default function NearbyPlaces({ coordinates, locationDetails }) {
  const [places, setPlaces] = useState([]);
  const [matchType, setMatchType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPlaces() {
      setLoading(true);
      setError(null);

      // 1. Check cache first
      const cachedData = getCache("nearbyPlacesCache");
      if (cachedData && cachedData.coordinates && cachedData.places) {
        // Calculate how far user moved since cache was created
        const distanceMoved = calculateDistance(
          coordinates.latitude,
          coordinates.longitude,
          cachedData.coordinates.latitude,
          cachedData.coordinates.longitude,
        );

        // If moved less than 500 meters (0.5 km), reuse cache
        if (distanceMoved < 0.5) {
          // Re-sort just in case, but using cached places
          const placesWithUpdatedDistance = cachedData.places
            .map((place) => ({
              ...place,
              distance: calculateDistance(
                coordinates.latitude,
                coordinates.longitude,
                place.latitude,
                place.longitude,
              ),
            }))
            .sort((a, b) => a.distance - b.distance);

          setPlaces(placesWithUpdatedDistance);
          setMatchType(cachedData.matchType);
          setLoading(false);
          return;
        }
      }

      // 2. Fetch from database if cache invalid or moved too far
      try {
        const { places: rawPlaces, matchType: type } = await fetchNearbyPlaces(
          locationDetails.district,
          locationDetails.state,
        );

        setMatchType(type);

        if (type === "none" || rawPlaces.length === 0) {
          setPlaces([]);
          setLoading(false);
          return;
        }

        // Calculate distance for each place and sort nearest first
        const placesWithDistance = rawPlaces
          .map((place) => ({
            ...place,
            distance: calculateDistance(
              coordinates.latitude,
              coordinates.longitude,
              place.latitude,
              place.longitude,
            ),
          }))
          .sort((a, b) => a.distance - b.distance);

        setPlaces(placesWithDistance);

        // 3. Save new fetch to cache
        saveCache("nearbyPlacesCache", {
          coordinates: coordinates,
          places: rawPlaces, // Save raw so we can recalculate distance perfectly next time
          matchType: type,
        });
      } catch (err) {
        setError(err.message || "Unable to fetch places.");
      } finally {
        setLoading(false);
      }
    }

    if (coordinates && locationDetails) {
      loadPlaces();
    }
  }, [coordinates, locationDetails]);

  // Loading state
  if (loading) {
    return (
      <div
        id="places-loading"
        className="flex flex-col items-center gap-3 py-8"
      >
        <div className="spinner" />
        <p className="text-xs font-semibold text-muted tracking-wide uppercase pulse-text">
          Finding places near you...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        id="places-error"
        className="rounded-xl border border-error/10 bg-error-soft p-6 text-center"
      >
        <p className="text-sm font-semibold text-error-deep">{error}</p>
      </div>
    );
  }

  return <PlacesList places={places} matchType={matchType} />;
}
