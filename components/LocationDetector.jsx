"use client";

import { useLocation } from "@/hooks/useLocation";
import LoadingScreen from "./LoadingScreen";
import LocationCard from "./LocationCard";
import ErrorCard from "./ErrorCard";
import NearbyPlaces from "./NearbyPlaces";

/**
 * LocationDetector Component
 * Orchestrates the app dashboard feed (Location + Places)
 */
export default function LocationDetector() {
  const { coordinates, locationDetails, loading, error, retry } = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="flex w-full items-center justify-center px-4 py-8">
        <ErrorCard message={error} onRetry={retry} />
      </div>
    );
  }

  if (coordinates && locationDetails) {
    return (
      <div className="flex w-full flex-col gap-8 px-4 sm:px-6">
        {/* Phase 1: Auto Location Card */}
        <div className="w-full pt-4">
          <LocationCard
            coordinates={coordinates}
            locationDetails={locationDetails}
          />
        </div>

        {/* Phase 2: Nearby Places */}
        <div className="w-full">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
            Trending Near You
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
