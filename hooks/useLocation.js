/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import { getLocationDetails } from "@/services/locationService";
import { getCache, saveCache } from "@/lib/cacheManager";

/**
 * Custom hook for detecting user location.
 * Uses smart caching to prevent unnecessary GPS API calls.
 */
export function useLocation() {
  const [coordinates, setCoordinates] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const detectLocation = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    // 1. Check cache first (if not forcing a refresh)
    if (!forceRefresh) {
      const cachedData = getCache("locationCache");
      if (cachedData) {
        setCoordinates(cachedData.coordinates);
        setLocationDetails(cachedData.details);
        setLoading(false);
        return;
      }
    }

    setCoordinates(null);
    setLocationDetails(null);

    // 2. Request new GPS location
    if (!navigator.geolocation) {
      setError("Geolocation is not supported on this device.");
      setLoading(false);
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      const coords = { latitude, longitude };
      setCoordinates(coords);

      // Reverse geocode
      const details = await getLocationDetails(latitude, longitude);
      setLocationDetails(details);

      // Save to cache
      saveCache("locationCache", {
        coordinates: coords,
        details: details,
      });
    } catch (err) {
      if (err.code) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError(
              "Location access denied. Please allow location access to continue.",
            );
            break;
          case err.POSITION_UNAVAILABLE:
            setError(
              "Unable to detect your location. Position information is unavailable.",
            );
            break;
          case err.TIMEOUT:
            setError("Location request timed out. Please try again.");
            break;
          default:
            setError(
              "An unknown error occurred while detecting your location.",
            );
        }
      } else {
        setError(
          "Could not fetch address details. Please check your internet connection.",
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    detectLocation(false);
  }, [detectLocation]);

  return {
    coordinates,
    locationDetails,
    loading,
    error,
    retry: () => detectLocation(true), // Force refresh on retry
  };
}
