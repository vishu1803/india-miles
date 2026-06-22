import { describe, it, expect } from "vitest";
import { calculateDistance } from "../utils/distance";

describe("calculateDistance", () => {
  it("should return 0 for identical coordinates", () => {
    const dist = calculateDistance(19.076, 72.8777, 19.076, 72.8777);
    expect(dist).toBe(0);
  });

  it("should calculate correct distance between Mumbai and Pune", () => {
    // Mumbai: 19.0760, 72.8777
    // Pune: 18.5204, 73.8567
    // Distance should be around 118-120 km
    const dist = calculateDistance(19.076, 72.8777, 18.5204, 73.8567);
    expect(dist).toBeGreaterThan(115);
    expect(dist).toBeLessThan(125);
  });
});
