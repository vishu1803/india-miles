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

  const handleMarkVisited = () => {
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
        className="glass-panel group relative flex w-[180px] flex-shrink-0 flex-col overflow-hidden rounded-[24px] sm:w-[220px]"
      >
        {/* Place Image */}
        <div className="relative h-[180px] w-full overflow-hidden sm:h-[220px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <img
            src={imageUrl}
            alt={place.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1506461883276-594a12b11ac3?auto=format&fit=crop&w=600&q=80";
            }}
          />

          {/* Badge */}
          {place.category && (
            <div className="absolute top-3 left-3 z-20">
              <span className="rounded-full bg-black/50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                {place.category}
              </span>
            </div>
          )}

          {/* Details Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
            <h3 className="line-clamp-1 text-sm font-bold text-white shadow-black drop-shadow-md sm:text-base">
              {place.name}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{place.distance} km</span>
            </div>
          </div>
        </div>
      </div>

      <LoginPopup isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
