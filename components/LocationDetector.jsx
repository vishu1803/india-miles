"use client";

import { useLocation } from "@/hooks/useLocation";
import LoadingScreen from "./LoadingScreen";
import LocationCard from "./LocationCard";
import ErrorCard from "./ErrorCard";

/**
 * LocationDetector Component
 * Orchestrates the location detection flow:
 * - Shows loading state while detecting
 * - Shows location card on success
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
      <div className="flex flex-1 items-center justify-center px-4">
        <LocationCard
          coordinates={coordinates}
          locationDetails={locationDetails}
        />
      </div>
    );
  }

  return null;
}
