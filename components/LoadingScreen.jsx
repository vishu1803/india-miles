"use client";

/**
 * LoadingScreen Component
 * Displays a centered spinner with loading text while detecting location.
 */
export default function LoadingScreen() {
  return (
    <div
      id="loading-screen"
      className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16"
    >
      <div className="spinner mb-2" />
      <p className="caption-mono uppercase tracking-[0.15em] text-muted text-xs font-semibold pulse-text">
        Detecting your location...
      </p>
    </div>
  );
}
