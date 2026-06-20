"use client";

/**
 * LoadingScreen Component
 * Displays a centered spinner with loading text while detecting location.
 */
export default function LoadingScreen() {
  return (
    <div
      id="loading-screen"
      className="flex flex-1 flex-col items-center justify-center gap-6 px-4"
    >
      <div className="spinner" />
      <p
        className="pulse-text text-base font-medium"
        style={{ color: "var(--muted)" }}
      >
        Detecting your location...
      </p>
    </div>
  );
}
