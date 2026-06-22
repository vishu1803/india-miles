"use client";

/**
 * LocationCard Component
 * Compact native app widget displaying current location.
 */
export default function LocationCard({ coordinates, locationDetails }) {
  return (
    <div
      id="location-card"
      className="glass-panel relative w-full overflow-hidden rounded-3xl p-5"
    >
      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 backdrop-blur-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-blue-400"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>

        {/* Primary Location */}
        <div className="flex-1">
          <p className="text-[11px] font-bold tracking-wider text-blue-400 uppercase mb-0.5">
            Location
          </p>
          <h2 className="text-xl font-bold tracking-tight text-white leading-tight">
            {locationDetails?.city ||
              locationDetails?.district ||
              "Unknown Location"}
          </h2>

          {/* Secondary Details */}
          <div className="mt-3 flex flex-wrap gap-2">
            {locationDetails?.state && (
              <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-semibold text-gray-300 backdrop-blur-sm">
                {locationDetails.state}
              </span>
            )}
            {locationDetails?.postcode && (
              <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-semibold text-gray-300 backdrop-blur-sm">
                {locationDetails.postcode}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
