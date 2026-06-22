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
    <div className="min-h-screen bg-black pb-10 pt-6 sm:pt-10">
      <div className="mx-auto max-w-md overflow-hidden sm:rounded-[2.5rem]">
        {/* Header Section */}
        <div className="relative px-6 pb-8 pt-4 text-center">
          {/* Avatar */}
          <div className="mx-auto mb-4 inline-block overflow-hidden rounded-full border-4 border-white/10 bg-white/5 shadow-2xl">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="h-28 w-28 object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-4xl font-bold text-blue-400">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Name & Username */}
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {profile.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-500">
            @{profile.username || "user"}
          </p>

          {/* Edit Button */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/profile/edit"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-xs font-bold text-white transition-colors hover:bg-white/10 active:scale-[0.98]"
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
        <div className="px-6 pb-6">
          <h2 className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-gray-500">
            Travel Progress
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-panel flex flex-col items-center justify-center rounded-2xl p-4 transition-transform hover:scale-105">
              <span className="text-2xl font-black text-white">
                {profile.total_places || 0}
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Places
              </span>
            </div>
            <div className="glass-panel flex flex-col items-center justify-center rounded-2xl p-4 transition-transform hover:scale-105">
              <span className="text-2xl font-black text-white">
                {profile.total_states || 0}
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                States
              </span>
            </div>
            <div className="glass-panel flex flex-col items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 transition-transform hover:scale-105">
              <span className="text-lg font-black text-blue-400">
                {profile.badge_level || "Beginner"}
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-blue-500/50">
                Badge
              </span>
            </div>
          </div>
        </div>

        {/* Personal Info Section */}
        <div className="px-6 pb-8">
          <h2 className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-gray-500">
            Personal Info
          </h2>
          <div className="glass-panel overflow-hidden rounded-3xl">
            <div className="flex flex-col p-2">
              {/* Bio */}
              <div className="flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-white/5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-gray-400 border border-white/5">
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex-1 border-b border-white/5 pb-2">
                  <p className="text-sm font-semibold text-white">Bio</p>
                  <p className="text-xs text-gray-400">
                    {profile.bio || "No bio added yet."}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-white/5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-gray-400 border border-white/5">
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
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="flex-1 border-b border-white/5 pb-2">
                  <p className="text-sm font-semibold text-white">
                    Home Address
                  </p>
                  <p className="text-xs text-gray-400">
                    {profile.home_city && profile.home_state
                      ? `${profile.home_city}, ${profile.home_state}`
                      : "Not provided"}
                  </p>
                </div>
              </div>

              {/* Email (Read Only) */}
              <div className="flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-white/5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-gray-400 border border-white/5">
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
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">
                    Account Email
                  </p>
                  <p className="text-xs text-gray-400">{profile.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-6 pb-10">
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 py-4 text-sm font-bold text-red-500 transition-colors hover:bg-red-500/20 active:scale-[0.98]"
          >
            <svg
              width="18"
              height="18"
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
      </div>

      {/* Bottom Nav Spacer */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-xs font-bold text-gray-500 transition-colors hover:text-white"
        >
          &larr; Back to App Feed
        </Link>
      </div>
    </div>
  );
}
