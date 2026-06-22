import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  saveCache,
  getCache,
  clearCache,
  clearAllCache,
} from "../lib/cacheManager";

describe("cacheManager", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.useFakeTimers();
  });

  it("should save data to cache and retrieve it", () => {
    const data = { city: "Mumbai" };
    saveCache("testKey", data);

    const retrieved = getCache("testKey");
    expect(retrieved).toEqual(data);
  });

  it("should return null if cache is expired", () => {
    const data = { city: "Mumbai" };
    saveCache("testKey", data);

    // Advance time by 31 minutes
    vi.advanceTimersByTime(31 * 60 * 1000);

    const retrieved = getCache("testKey", 30 * 60 * 1000);
    expect(retrieved).toBeNull();
  });

  it("should clear a specific cache key", () => {
    saveCache("testKey", { data: 1 });
    clearCache("testKey");
    expect(getCache("testKey")).toBeNull();
  });

  it("should clear all app cache keys", () => {
    saveCache("locationCache", { loc: 1 });
    saveCache("nearbyPlacesCache", { places: [] });

    clearAllCache();

    expect(getCache("locationCache")).toBeNull();
    expect(getCache("nearbyPlacesCache")).toBeNull();
  });
});
