"use client";

import { useState, useEffect } from "react";
import { fetchNearbyPlaces } from "@/services/placesService";
import { calculateDistance } from "@/utils/distance";
import PlacesList from "./PlacesList";

/**
 * NearbyPlaces Component
 * Fetches places from Supabase, calculates distances, sorts by nearest first.
 *
 * @param {Object} props
 * @param {Object} props.coordinates - { latitude, longitude }
 * @param {Object} props.locationDetails - { district, state, ... }
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

      try {
        const { places: rawPlaces, matchType: type } = await fetchNearbyPlaces(
          locationDetails.district,
          locationDetails.state
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
              place.longitude
            ),
          }))
          .sort((a, b) => a.distance - b.distance);

        setPlaces(placesWithDistance);
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
        <p className="text-sm" style={{ color: "var(--muted)" }}>
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
        className="rounded-xl border p-6 text-center"
        style={{
          backgroundColor: "var(--error-light)",
          borderColor: "var(--error-border)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--error)" }}>
          {error}
        </p>
      </div>
    );
  }

  return <PlacesList places={places} matchType={matchType} />;
}
