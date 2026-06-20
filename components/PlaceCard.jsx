"use client";

/**
 * PlaceCard Component
 * Renders a single place with image, name, category, description, and distance.
 *
 * @param {Object} props
 * @param {Object} props.place - Place data with name, category, description, image_url, distance.
 */
export default function PlaceCard({ place }) {
  const imageUrl = place.image_url || "/default-place.jpg";

  return (
    <div
      id={`place-card-${place.id}`}
      className="w-full overflow-hidden rounded-xl border"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      {/* Place Image */}
      <div className="relative h-44 w-full overflow-hidden bg-gray-200 sm:h-52">
        <img
          src={imageUrl}
          alt={place.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/default-place.jpg";
          }}
        />
      </div>

      {/* Place Details */}
      <div className="p-4">
        <h3 className="text-base font-semibold">{place.name}</h3>

        {place.category && (
          <span
            className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: "var(--accent)",
              color: "#ffffff",
            }}
          >
            {place.category}
          </span>
        )}

        {place.description && (
          <p
            className="mt-2 line-clamp-2 text-sm"
            style={{ color: "var(--muted)" }}
          >
            {place.description}
          </p>
        )}

        <div
          className="mt-3 flex items-center gap-1.5 text-sm font-medium"
          style={{ color: "var(--primary)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{place.distance} km away</span>
        </div>
      </div>
    </div>
  );
}
