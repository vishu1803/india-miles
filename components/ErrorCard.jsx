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
      className="w-full max-w-md rounded-xl border border-error/10 bg-error-soft p-6 shadow-lvl-2"
    >
      <div className="mb-3.5 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-error"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h2 className="text-base font-bold text-error-deep">Location Error</h2>
      </div>

      <p className="mb-5 text-sm text-error-deep leading-relaxed">{message}</p>

      <button
        id="retry-button"
        onClick={onRetry}
        className="w-full cursor-pointer rounded-md bg-error py-2.5 text-center text-xs font-bold text-white transition-colors hover:bg-error-deep"
      >
        Try Again
      </button>
    </div>
  );
}
