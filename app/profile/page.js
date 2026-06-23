/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function ProfilePage() {
  const { user, isAuthenticated, logout, authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    async function fetchProfile() {
      if (isAuthenticated) {
        try {
          const res = await api.get("/profile");
          setProfile(res.data.profile);
        } catch (err) {
          console.error("Failed to fetch profile", err);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchProfile();
  }, [isAuthenticated]);

  if (authLoading || loading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas-soft pb-16 selection:bg-primary/10">
      <div className="mx-auto max-w-md border-x border-hairline bg-canvas min-h-screen px-6 pt-10 pb-16 shadow-sm">
        {/* Header Section */}
        <div className="relative pb-8 text-center">
          {/* Avatar */}
          <div className="mx-auto mb-4 inline-block overflow-hidden rounded-full border-4 border-canvas bg-canvas-soft-2 shadow-lvl-2">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="h-28 w-28 object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center bg-canvas-soft-2 text-4xl font-bold text-primary font-sans">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Name & Username */}
          <h1 className="text-2xl font-bold tracking-tight text-primary tracking-[-0.96px]">
            {profile.name}
          </h1>
          <p className="caption-mono mt-1 text-xs text-muted">
            @{profile.username || "user"}
          </p>

          {/* Edit Button */}
          <div className="mt-5 flex justify-center">
            <Link
              href="/profile/edit"
              className="flex items-center gap-2 rounded border border-hairline bg-canvas px-5 py-2 text-xs font-bold text-primary transition-colors hover:bg-canvas-soft-2 shadow-lvl-1"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="pb-6">
          <h2 className="caption-mono mb-3 px-1 text-xs font-bold uppercase tracking-wider text-muted">
            Travel Progress
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-canvas border border-hairline rounded-lg flex flex-col items-center justify-center p-4 shadow-lvl-1">
              <span className="text-2xl font-extrabold text-primary">
                {profile.total_places || 0}
              </span>
              <span className="caption-mono mt-1 text-[9px] font-bold uppercase tracking-wider text-muted">
                Places
              </span>
            </div>
            <div className="bg-canvas border border-hairline rounded-lg flex flex-col items-center justify-center p-4 shadow-lvl-1">
              <span className="text-2xl font-extrabold text-primary">
                {profile.total_states || 0}
              </span>
              <span className="caption-mono mt-1 text-[9px] font-bold uppercase tracking-wider text-muted">
                States
              </span>
            </div>
            <div className="bg-primary border border-primary rounded-lg flex flex-col items-center justify-center p-4 shadow-lvl-2">
              <span className="text-sm font-bold text-on-primary">
                {profile.badge_level || "Beginner"}
              </span>
              <span className="caption-mono mt-1.5 text-[9px] font-bold uppercase tracking-wider text-on-primary/60">
                Badge
              </span>
            </div>
          </div>
        </div>

        {/* Personal Info Section */}
        <div className="pb-8">
          <h2 className="caption-mono mb-3 px-1 text-xs font-bold uppercase tracking-wider text-muted">
            Personal Info
          </h2>
          <div className="bg-canvas border border-hairline overflow-hidden rounded-lg shadow-lvl-2">
            <div className="flex flex-col">
              {/* Bio */}
              <div className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-canvas-soft-2 border-b border-hairline">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-canvas-soft-2 text-muted border border-hairline">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="caption-mono text-[10px] font-bold text-muted uppercase tracking-wider">
                    Bio
                  </p>
                  <p className="text-xs text-primary font-medium mt-0.5 truncate">
                    {profile.bio || "No bio added yet."}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-canvas-soft-2 border-b border-hairline">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-canvas-soft-2 text-muted border border-hairline">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="caption-mono text-[10px] font-bold text-muted uppercase tracking-wider">
                    Home Address
                  </p>
                  <p className="text-xs text-primary font-medium mt-0.5 truncate">
                    {profile.home_city && profile.home_state
                      ? `${profile.home_city}, ${profile.home_state}`
                      : "Not provided"}
                  </p>
                </div>
              </div>

              {/* Email (Read Only) */}
              <div className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-canvas-soft-2">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-canvas-soft-2 text-muted border border-hairline">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="caption-mono text-[10px] font-bold text-muted uppercase tracking-wider">
                    Account Email
                  </p>
                  <p className="text-xs text-primary font-medium mt-0.5 truncate">
                    {profile.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="pb-6">
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded border border-error/15 bg-error-soft py-3 text-xs font-bold text-error-deep transition-colors hover:bg-error-soft/80 shadow-lvl-1"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sign Out
          </button>
        </div>

        {/* Bottom Nav Spacer */}
        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs font-bold text-muted transition-colors hover:text-primary hover:underline"
          >
            &larr; Back to App Feed
          </Link>
        </div>
      </div>
    </div>
  );
}
