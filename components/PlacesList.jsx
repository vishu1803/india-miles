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
        className="bg-canvas border border-hairline rounded-xl p-8 text-center shadow-lvl-1"
      >
        <p className="text-sm font-medium text-muted">
          No places found in your area.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {matchType === "state" && (
        <div className="caption-mono mb-5 flex items-center gap-2 rounded bg-warning-soft px-4 py-2.5 text-xs font-semibold text-warning-deep border border-warning/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-warning"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>
            No results in your district. Showing places from your state.
          </span>
        </div>
      )}

      <div
        id="places-list"
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
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
