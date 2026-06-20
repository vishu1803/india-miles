"use client";

/**
 * ErrorCard Component
 * Displays error messages for permission denied, API failure, etc.
 *
 * @param {Object} props
 * @param {string} props.message - Error message to display.
 * @param {Function} props.onRetry - Callback to retry location detection.
 */
export default function ErrorCard({ message, onRetry }) {
  return (
    <div
      id="error-card"
      className="w-full max-w-md rounded-xl border p-6 shadow-sm"
      style={{
        backgroundColor: "var(--error-light)",
        borderColor: "var(--error-border)",
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          style={{ color: "var(--error)" }}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h2 className="text-lg font-semibold" style={{ color: "var(--error)" }}>
          Location Error
        </h2>
      </div>

      <p className="mb-4 text-sm" style={{ color: "var(--foreground)" }}>
        {message}
      </p>

      <button
        id="retry-button"
        onClick={onRetry}
        className="w-full cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors"
        style={{ backgroundColor: "var(--primary)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--primary-light)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--primary)")
        }
      >
        Try Again
      </button>
    </div>
  );
}
