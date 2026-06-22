/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "@/lib/api";

const AuthContext = createContext(null);

/**
 * AuthProvider — wraps the app and provides authentication state.
 * On mount, it calls /api/auth/me to check if the user is already logged in.
 * If the access token is expired, the axios interceptor auto-refreshes it.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  /**
   * Check if user is authenticated on app load.
   */
  const checkAuth = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      if (data.success) {
        setUser(data.user);
      }
    } catch (err) {
      // Not authenticated — that's ok
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  /**
   * Register a new user.
   */
  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    if (data.success) {
      setUser(data.user);
    }
    return data;
  };

  /**
   * Login an existing user.
   */
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (data.success) {
      setUser(data.user);
    }
    return data;
  };

  /**
   * Logout the current user.
   */
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // Ignore errors — clear state anyway
    }
    setUser(null);
  };

  const value = {
    user,
    authLoading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth state.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
