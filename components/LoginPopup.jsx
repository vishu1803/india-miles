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
        className="absolute inset-0 bg-primary/25 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="bg-canvas border border-hairline shadow-lvl-5 relative z-10 w-full max-w-sm rounded-xl p-8 text-center animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted hover:bg-canvas-soft-2 hover:text-primary transition-colors"
        >
          <svg
            width="18"
            height="18"
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

        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-canvas-soft-2 border border-hairline text-primary">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h3 className="display-sm text-primary mb-2 font-bold tracking-tight">
          Unlock Your Journey
        </h3>
        <p className="mb-6 text-sm text-body leading-relaxed">
          Sign in to mark places you&apos;ve visited, earn explorer badges, and
          track your travel progress across India.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/register"
            className="w-full rounded bg-primary px-4 py-2.5 text-xs font-bold text-on-primary transition-colors hover:bg-body text-center"
          >
            Create Free Account
          </Link>
          <Link
            href="/login"
            className="w-full rounded border border-hairline bg-canvas px-4 py-2.5 text-xs font-bold text-primary transition-colors hover:bg-canvas-soft-2 text-center"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
