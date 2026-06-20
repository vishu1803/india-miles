"use client";

import { useLocation } from "@/hooks/useLocation";
import LoadingScreen from "./LoadingScreen";
import LocationCard from "./LocationCard";
import ErrorCard from "./ErrorCard";
import NearbyPlaces from "./NearbyPlaces";

/**
 * LocationDetector Component
 * Orchestrates the location detection flow:
 * - Shows loading state while detecting
 * - Shows location card on success
 * - Shows nearby places below the location card (Phase 2)
 * - Shows error card on failure
 */
export default function LocationDetector() {
  const { coordinates, locationDetails, loading, error, retry } = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center px-4">
        <ErrorCard message={error} onRetry={retry} />
      </div>
    );
  }

  if (coordinates && locationDetails) {
    return (
      <div className="flex flex-1 flex-col items-center px-4 py-6 gap-8">
        {/* Phase 1: Location Card */}
        <LocationCard
          coordinates={coordinates}
          locationDetails={locationDetails}
        />

        {/* Phase 2: Nearby Places */}
        <div className="w-full max-w-md">
          <h2
            className="mb-4 text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Places Near You
          </h2>
          <NearbyPlaces
            coordinates={coordinates}
            locationDetails={locationDetails}
          />
        </div>
      </div>
    );
  }

  return null;
}
