/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoginPopup from "./LoginPopup";

/**
 * PlaceCard Component
 * Compact native app widget for places.
 */
export default function PlaceCard({ place }) {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const imageUrl =
    place.image_url ||
    `https://images.unsplash.com/photo-1506461883276-594a12b11ac3?auto=format&fit=crop&w=600&q=80`;

  const handleMarkVisited = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      alert("This premium feature is unlocking soon in the next phase!");
    }
  };

  return (
    <>
      <div
        id={`place-card-${place.id}`}
        className="bg-canvas border border-hairline shadow-lvl-2 group relative flex w-[180px] flex-shrink-0 flex-col overflow-hidden rounded-xl transition-all hover:shadow-lvl-3 sm:w-[220px]"
      >
        {/* Place Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-hairline bg-canvas-soft-2">
          <img
            src={imageUrl}
            alt={place.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1506461883276-594a12b11ac3?auto=format&fit=crop&w=600&q=80";
            }}
          />

          {/* Badge */}
          {place.category && (
            <div className="absolute top-2.5 left-2.5 z-20">
              <span className="caption-mono rounded bg-canvas/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary border border-hairline backdrop-blur-md">
                {place.category}
              </span>
            </div>
          )}
        </div>

        {/* Details Area */}
        <div className="flex flex-1 flex-col p-4 bg-canvas">
          <h3 className="line-clamp-1 text-sm font-bold text-primary font-sans leading-tight">
            {place.name}
          </h3>

          <div className="caption-mono mt-1.5 flex items-center gap-1 text-xs font-semibold text-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{place.distance} km</span>
          </div>

          <button
            onClick={handleMarkVisited}
            className="caption-mono mt-4 w-full rounded border border-hairline bg-canvas-soft py-1.5 text-center text-xs font-bold text-primary transition-colors hover:bg-canvas-soft-2"
          >
            Mark Visited
          </button>
        </div>
      </div>

      <LoginPopup isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
