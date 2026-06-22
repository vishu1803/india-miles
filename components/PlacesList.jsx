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
    <div className="w-full">
      {matchType === "state" && (
        <p className="mb-4 text-sm text-gray-400">
          No results in your district. Showing places from your state.
        </p>
      )}

      <div
        id="places-list"
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollPaddingLeft: "1rem" }}
      >
        {places.map((place) => (
          <div key={place.id} className="snap-start">
            <PlaceCard place={place} />
          </div>
        ))}
      </div>
    </div>
  );
}
