"use client";

import LocationDetector from "@/components/LocationDetector";

/**
 * Home Page
 * Entry point of the India Miles application.
 * Displays header branding and the location detection flow.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header
        id="app-header"
        className="flex flex-col items-center gap-1 border-b px-4 py-6"
        style={{ borderColor: "var(--card-border)" }}
      >
        <h1
          className="text-2xl font-bold tracking-wide sm:text-3xl"
          style={{ color: "var(--primary)" }}
        >
          INDIA MILES
        </h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Discover India around you
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        <LocationDetector />
      </main>

      {/* Footer */}
      <footer
        className="border-t px-4 py-4 text-center text-xs"
        style={{
          borderColor: "var(--card-border)",
          color: "var(--muted)",
        }}
      >
        India Miles &middot; Location Detection System
      </footer>
    </div>
  );
}
