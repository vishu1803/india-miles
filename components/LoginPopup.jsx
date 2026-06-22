"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * LoginPopup Component
 * A premium modal shown when a guest user tries to access locked features.
 */
export default function LoginPopup({ isOpen, onClose }) {
  // Prevent body scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="glass-panel relative z-10 w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h3 className="mb-2 text-xl font-bold tracking-tight text-white">
          Unlock Your Journey
        </h3>
        <p className="mb-8 text-sm text-gray-400">
          Sign in to mark places you&apos;ve visited, earn explorer badges, and
          track your travel progress across India.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/register"
            className="w-full rounded-xl bg-white px-4 py-3.5 text-sm font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Free Account
          </Link>
          <Link
            href="/login"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
