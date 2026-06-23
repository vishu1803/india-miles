"use client";

import LocationDetector from "@/components/LocationDetector";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import LoginPopup from "@/components/LoginPopup";
import { useRouter } from "next/navigation";

/**
 * Home Page
 * Native Mobile App Dashboard Redesign
 */
export default function Home() {
  const { user, isAuthenticated, authLoading } = useAuth();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter();

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      setShowLoginPopup(true);
    } else {
      router.push("/profile");
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas-soft selection:bg-primary/10 selection:text-primary">
      {/* Top Navbar */}
      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-hairline bg-canvas/80 px-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-primary"></div>
          <h1 className="text-base font-bold tracking-[0.15em] text-primary">
            INDIAMILES
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-body transition-colors hover:text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {authLoading ? null : isAuthenticated ? (
            <button
              onClick={handleProfileClick}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white transition-colors hover:bg-body"
            >
              {user?.name?.charAt(0).toUpperCase()}
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-hairline bg-canvas px-4 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-canvas-soft-2"
            >
              Log in
            </Link>
          )}
        </div>
      </header>

      {/* Main Content (App Feed) */}
      <main className="flex flex-1 flex-col pt-16 pb-28">
        {/* Hero section with signature mesh gradient */}
        <div className="mesh-gradient-bg relative w-full border-b border-hairline pt-16 pb-12 text-center px-4 sm:px-6">
          <span className="caption-mono uppercase tracking-[0.2em] text-link mb-3 inline-block font-semibold">
            India Miles
          </span>
          <h2 className="display-xl text-primary max-w-2xl mx-auto mb-4">
            Discover India around you.
          </h2>
          <p className="max-w-md mx-auto text-body text-sm sm:text-base leading-relaxed">
            Real-time location-aware travel insights and explorations across
            India.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-8">
          <LocationDetector />
        </div>
      </main>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 z-50 flex w-auto -translate-x-1/2 items-center justify-center gap-6 rounded-full border border-hairline bg-canvas/90 px-6 py-2.5 shadow-lvl-3 backdrop-blur-xl sm:bottom-8 sm:gap-8 sm:px-7">
        {/* Explore Tab (Active) */}
        <button className="flex flex-col items-center gap-0.5 text-primary">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
            </svg>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider">
            Explore
          </span>
        </button>

        {/* Search Tab */}
        <button className="flex flex-col items-center gap-0.5 text-muted transition-colors hover:text-primary">
          <div className="flex h-9 w-9 items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-wider">
            Search
          </span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={handleProfileClick}
          className="flex flex-col items-center gap-0.5 text-muted transition-colors hover:text-primary"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-wider">
            Profile
          </span>
        </button>
      </div>

      {/* Login Popup */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />
    </div>
  );
}
