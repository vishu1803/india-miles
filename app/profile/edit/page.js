"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function EditProfilePage() {
  const { isAuthenticated, authLoading } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    home_state: "",
    home_city: "",
  });

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
          const p = res.data.profile;
          setFormData({
            username: p.username || "",
            bio: p.bio || "",
            home_state: p.home_state || "",
            home_city: p.home_city || "",
          });
        } catch (err) {
          setError("Failed to load profile data.");
        } finally {
          setLoading(false);
        }
      }
    }
    fetchProfile();
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      await api.put("/profile", formData);
      setSuccess(true);
      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas-soft">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas-soft pb-16 selection:bg-primary/10">
      <div className="mx-auto max-w-md border-x border-hairline bg-canvas min-h-screen px-6 pt-10 pb-16 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/profile"
            className="rounded border border-hairline bg-canvas p-1.5 text-muted transition-colors hover:bg-canvas-soft-2 hover:text-primary shadow-sm"
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
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>
          <h1 className="text-base font-bold text-primary">Edit Profile</h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>

        {/* Form Card */}
        <div className="rounded-lg border border-hairline bg-canvas p-6 shadow-lvl-2">
          {error && (
            <div className="mb-5 rounded border border-error/15 bg-error-soft p-4 text-xs font-semibold text-error-deep">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded border border-link/15 bg-link-bg-soft p-4 text-xs font-semibold text-link-deep">
              Profile updated successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="caption-mono mb-1.5 block text-xs font-semibold text-body uppercase tracking-wider"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded border border-hairline bg-canvas px-3 py-2 text-sm text-primary outline-none transition-all focus:border-link focus:ring-4 focus:ring-link/10"
                placeholder="Unique username"
              />
            </div>

            {/* Bio */}
            <div>
              <label
                htmlFor="bio"
                className="caption-mono mb-1.5 block text-xs font-semibold text-body uppercase tracking-wider"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
                className="w-full resize-none rounded border border-hairline bg-canvas px-3 py-2 text-sm text-primary outline-none transition-all focus:border-link focus:ring-4 focus:ring-link/10"
                placeholder="Tell us a bit about yourself"
              ></textarea>
            </div>

            {/* State and City */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="home_state"
                  className="caption-mono mb-1.5 block text-xs font-semibold text-body uppercase tracking-wider"
                >
                  Home State
                </label>
                <input
                  id="home_state"
                  name="home_state"
                  type="text"
                  value={formData.home_state}
                  onChange={handleChange}
                  className="w-full rounded border border-hairline bg-canvas px-3 py-2 text-sm text-primary outline-none transition-all focus:border-link focus:ring-4 focus:ring-link/10"
                  placeholder="e.g., Maharashtra"
                />
              </div>
              <div>
                <label
                  htmlFor="home_city"
                  className="caption-mono mb-1.5 block text-xs font-semibold text-body uppercase tracking-wider"
                >
                  Home City
                </label>
                <input
                  id="home_city"
                  name="home_city"
                  type="text"
                  value={formData.home_city}
                  onChange={handleChange}
                  className="w-full rounded border border-hairline bg-canvas px-3 py-2 text-sm text-primary outline-none transition-all focus:border-link focus:ring-4 focus:ring-link/10"
                  placeholder="e.g., Mumbai"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="mt-4 flex w-full items-center justify-center rounded bg-primary py-2.5 text-xs font-bold text-on-primary transition-colors hover:bg-body disabled:opacity-50"
            >
              {saving ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary/30 border-t-on-primary"></div>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
