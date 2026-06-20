"use client";

/**
 * LocationCard Component
 * Displays the detected location details in a clean card layout.
 *
 * @param {Object} props
 * @param {Object} props.coordinates - { latitude, longitude }
 * @param {Object} props.locationDetails - { city, district, state, postcode, country }
 */
export default function LocationCard({ coordinates, locationDetails }) {
  const fields = [
    { label: "Latitude", value: coordinates?.latitude?.toFixed(4) },
    { label: "Longitude", value: coordinates?.longitude?.toFixed(4) },
    { label: "City", value: locationDetails?.city },
    { label: "District", value: locationDetails?.district },
    { label: "State", value: locationDetails?.state },
    { label: "Pincode", value: locationDetails?.postcode },
    { label: "Country", value: locationDetails?.country },
  ];

  return (
    <div
      id="location-card"
      className="w-full max-w-md rounded-xl border p-6 shadow-sm"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="mb-5 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          style={{ color: "var(--success)" }}
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <h2 className="text-lg font-semibold">Your Location</h2>
      </div>

      <div className="space-y-3">
        {fields.map((field) => (
          <div
            key={field.label}
            className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0"
            style={{ borderColor: "var(--card-border)" }}
          >
            <span
              className="text-sm font-medium"
              style={{ color: "var(--muted)" }}
            >
              {field.label}
            </span>
            <span className="text-sm font-semibold">{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
