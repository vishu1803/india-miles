/**
 * Location Service
 * Handles reverse geocoding using OpenStreetMap Nominatim API.
 */

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/reverse";

/**
 * Fetches location details from coordinates using OpenStreetMap Nominatim API.
 * @param {number} latitude - The latitude coordinate.
 * @param {number} longitude - The longitude coordinate.
 * @returns {Promise<Object>} Parsed location details.
 */
export async function getLocationDetails(latitude, longitude) {
  const url = `${NOMINATIM_BASE_URL}?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

  const response = await fetch(url, {
    headers: {
      "Accept-Language": "en",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch address details from geocoding service.");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  const address = data.address || {};

  return {
    city:
      address.city ||
      address.town ||
      address.village ||
      address.hamlet ||
      "Unknown",
    district:
      address.county ||
      address.state_district ||
      address.city_district ||
      "Unknown",
    state: address.state || "Unknown",
    postcode: address.postcode || "Unknown",
    country: address.country || "Unknown",
    displayName: data.display_name || "",
  };
}
