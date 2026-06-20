/**
 * Library utilities for India Miles.
 * This module will house shared utility functions as the app grows.
 */

/**
 * Formats coordinates to a fixed number of decimal places.
 * @param {number} value - Coordinate value.
 * @param {number} [decimals=4] - Number of decimal places.
 * @returns {string} Formatted coordinate string.
 */
export function formatCoordinate(value, decimals = 4) {
  if (typeof value !== "number" || isNaN(value)) return "—";
  return value.toFixed(decimals);
}
