"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Register Page
 * Minimal form: Name, Email, Password.
 */
export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(name, email, password);
      router.push("/");
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header
        className="flex flex-col items-center gap-1 border-b px-4 py-6"
        style={{ borderColor: "var(--card-border)" }}
      >
        <Link href="/">
          <h1
            className="text-2xl font-bold tracking-wide sm:text-3xl"
            style={{ color: "var(--primary)" }}
          >
            INDIA MILES
          </h1>
        </Link>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Discover India around you
        </p>
      </header>

      {/* Form */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-sm rounded-xl border p-6"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--card-border)",
          }}
        >
          <h2 className="mb-6 text-center text-xl font-semibold">
            Create Account
          </h2>

          {error && (
            <div
              className="mb-4 rounded-lg border px-4 py-3 text-sm"
              style={{
                backgroundColor: "var(--error-light)",
                borderColor: "var(--error-border)",
                color: "var(--error)",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label
                htmlFor="register-name"
                className="mb-1 block text-sm font-medium"
                style={{ color: "var(--muted)" }}
              >
                Name
              </label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2"
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--card-border)",
                  color: "var(--foreground)",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="mb-1 block text-sm font-medium"
                style={{ color: "var(--muted)" }}
              >
                Email
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2"
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--card-border)",
                  color: "var(--foreground)",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="register-password"
                className="mb-1 block text-sm font-medium"
                style={{ color: "var(--muted)" }}
              >
                Password
              </label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2"
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--card-border)",
                  color: "var(--foreground)",
                }}
              />
            </div>

            {/* Submit */}
            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <div className="relative my-2 flex items-center">
              <div className="flex-grow border-t border-[var(--card-border)]"></div>
              <span className="mx-4 flex-shrink-0 text-xs text-[var(--muted)]">
                OR
              </span>
              <div className="flex-grow border-t border-[var(--card-border)]"></div>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={() => {
                window.location.href = "http://localhost:5000/api/auth/google";
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--card-border)] bg-transparent px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          <p
            className="mt-4 text-center text-sm"
            style={{ color: "var(--muted)" }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium underline"
              style={{ color: "var(--primary)" }}
            >
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
