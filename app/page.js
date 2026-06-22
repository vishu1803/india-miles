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
    <div className="flex min-h-[100dvh] flex-col bg-black selection:bg-blue-500/30">
      {/* Top Navbar */}
      <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-black/80 px-4 py-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-white"></div>
          <h1 className="text-lg font-bold tracking-[0.2em] text-white">
            INDIAMILES
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-white/70 transition-colors hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white transition-colors hover:bg-blue-500"
            >
              {user?.name?.charAt(0).toUpperCase()}
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/20"
            >
              Log in
            </Link>
          )}
        </div>
      </header>

      {/* Main Content (App Feed) */}
      <main className="flex flex-1 flex-col pt-20 pb-28">
        <LocationDetector />
      </main>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 z-50 flex w-auto -translate-x-1/2 items-center justify-center gap-6 rounded-full border border-white/10 bg-black/60 px-6 py-3 backdrop-blur-xl sm:bottom-10 sm:gap-10 sm:px-8">
        {/* Explore Tab (Active) */}
        <button className="flex flex-col items-center gap-1 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Explore
          </span>
        </button>

        {/* Search Tab */}
        <button className="flex flex-col items-center gap-1 text-white/50 transition-colors hover:text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Search
          </span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={handleProfileClick}
          className="flex flex-col items-center gap-1 text-white/50 transition-colors hover:text-white"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          <span className="text-[10px] font-bold uppercase tracking-wider">
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
