"use client";

import PlaceCard from "./PlaceCard";

/**
 * PlacesList Component
 * Renders a vertically stacked list of place cards.
 *
 * @param {Object} props
 * @param {Array} props.places - Array of place objects with distance attached.
 * @param {string} props.matchType - "district" or "state" to indicate scope.
 */
export default function PlacesList({ places, matchType }) {
  if (!places || places.length === 0) {
    return (
      <div
        id="no-places"
        className="rounded-xl border p-6 text-center"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          No places found in your area.
        </p>
      </div>
    );
  }

  return (
    <div id="places-list" className="flex flex-col gap-4">
      {matchType === "state" && (
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          No results in your district. Showing places from your state.
        </p>
      )}

      {places.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  );
}
