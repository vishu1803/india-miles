"use client";

import { useState, useEffect, useCallback } from "react";
import { getLocationDetails } from "@/services/locationService";

/**
 * Custom hook for detecting user location.
 * Handles permission, coordinates, reverse geocoding, loading, and errors.
 *
 * @returns {Object} Location state with coordinates, details, loading, and error.
 */
export function useLocation() {
  const [coordinates, setCoordinates] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const detectLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCoordinates(null);
    setLocationDetails(null);

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError("Geolocation is not supported on this device.");
      setLoading(false);
      return;
    }

    try {
      // Request browser permission and get coordinates
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      setCoordinates({ latitude, longitude });

      // Reverse geocode the coordinates
      const details = await getLocationDetails(latitude, longitude);
      setLocationDetails(details);
    } catch (err) {
      if (err.code) {
        // GeolocationPositionError
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location access denied. Please allow location access to continue.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Unable to detect your location. Position information is unavailable.");
            break;
          case err.TIMEOUT:
            setError("Location request timed out. Please try again.");
            break;
          default:
            setError("An unknown error occurred while detecting your location.");
        }
      } else {
        // API or network error
        setError("Could not fetch address details. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  return {
    coordinates,
    locationDetails,
    loading,
    error,
    retry: detectLocation,
  };
}
