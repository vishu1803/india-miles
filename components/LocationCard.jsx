"use client";

/**
 * LocationCard Component
 * Compact native app widget displaying current location.
 */
export default function LocationCard({ coordinates, locationDetails }) {
  return (
    <div
      id="location-card"
      className="bg-canvas border border-hairline shadow-lvl-2 relative w-full overflow-hidden rounded-2xl p-6 transition-all hover:shadow-lvl-3"
    >
      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-canvas-soft-2 border border-hairline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-link"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>

        {/* Primary Location */}
        <div className="flex-1">
          <p className="caption-mono uppercase tracking-[0.15em] text-link mb-1 font-semibold">
            Location
          </p>
          <h2 className="display-sm text-primary leading-tight tracking-[-0.6px] font-bold">
            {locationDetails?.city ||
              locationDetails?.district ||
              "Unknown Location"}
          </h2>

          {/* Secondary Details */}
          <div className="mt-3.5 flex flex-wrap gap-2">
            {locationDetails?.state && (
              <span className="caption-mono rounded bg-canvas-soft-2 border border-hairline px-2.5 py-1 text-xs font-medium text-body">
                {locationDetails.state}
              </span>
            )}
            {locationDetails?.postcode && (
              <span className="caption-mono rounded bg-canvas-soft-2 border border-hairline px-2.5 py-1 text-xs font-medium text-body">
                {locationDetails.postcode}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
