/**
 * Cache Manager Utility
 * Handles storing and retrieving data from localStorage with expiration logic.
 */

// 30 minutes in milliseconds
const CACHE_EXPIRATION_MS = 30 * 60 * 1000;

/**
 * Save data to cache with a timestamp.
 * @param {string} key
 * @param {any} data
 */
export function saveCache(key, data) {
  if (typeof window === "undefined") return;

  const cacheObject = {
    data,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(key, JSON.stringify(cacheObject));
  } catch (error) {
    console.error(`[CacheManager] Failed to save cache for key: ${key}`, error);
  }
}

/**
 * Retrieve data from cache if it is not expired.
 * @param {string} key
 * @param {number} maxAgeMs (default: 30 minutes)
 * @returns {any|null} The cached data, or null if expired/not found.
 */
export function getCache(key, maxAgeMs = CACHE_EXPIRATION_MS) {
  if (typeof window === "undefined") return null;

  try {
    const cachedString = localStorage.getItem(key);
    if (!cachedString) return null;

    const cacheObject = JSON.parse(cachedString);
    const now = Date.now();

    if (now - cacheObject.timestamp > maxAgeMs) {
      // Cache expired
      clearCache(key);
      return null;
    }

    return cacheObject.data;
  } catch (error) {
    console.error(`[CacheManager] Failed to read cache for key: ${key}`, error);
    return null;
  }
}

/**
 * Clear a specific cache key.
 * @param {string} key
 */
export function clearCache(key) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

/**
 * Clear all cache entries related to IndiaMiles.
 */
export function clearAllCache() {
  if (typeof window === "undefined") return;

  // Only clear specific keys to avoid nuking user's other local storage
  const keysToRemove = ["locationCache", "nearbyPlacesCache"];
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}
