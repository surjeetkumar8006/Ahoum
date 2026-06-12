import { create } from "zustand";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  tempPhoneNumber: string | null;
  location: { zone: string; area: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  otpCode: string | null;
  error: string | null;

  // Actions
  sendOtp: (phone: string) => Promise<boolean>;
  verifyOtp: (code: string) => Promise<boolean>;
  selectLocation: (zone: string, area: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Load initial state from localStorage
  const savedUser = localStorage.getItem("nectar_user");
  const savedLocation = localStorage.getItem("nectar_location");
  const parsedUser = savedUser ? JSON.parse(savedUser) : null;
  const parsedLocation = savedLocation ? JSON.parse(savedLocation) : null;

  return {
    user: parsedUser,
    tempPhoneNumber: null,
    location: parsedLocation,
    isAuthenticated: !!parsedUser && !!parsedLocation,
    isLoading: false,
    otpCode: null,
    error: null,

    sendOtp: async (phone) => {
      set({ isLoading: true, error: null });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ tempPhoneNumber: phone, otpCode: "1234", isLoading: false });
      return true;
    },

    verifyOtp: async (code) => {
      set({ isLoading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (code === get().otpCode || code === "1234") {
        const phoneUser: User = {
          username: `User_${get().tempPhoneNumber?.slice(-4) || "Guest"}`,
          phone: get().tempPhoneNumber || undefined,
          email: `${get().tempPhoneNumber || "user"}@nectar.com`,
        };
        set({ user: phoneUser, isLoading: false });
        return true;
      } else {
        set({ error: "Invalid OTP verification code. Please try '1234'.", isLoading: false });
        return false;
      }
    },

    selectLocation: (zone, area) => {
      const loc = { zone, area };
      const currentUser = get().user || { username: "Guest User", email: "guest@nectar.com" };
      const updatedUser = { ...currentUser, zone, area };
      
      localStorage.setItem("nectar_location", JSON.stringify(loc));
      localStorage.setItem("nectar_user", JSON.stringify(updatedUser));
      
      set({
        location: loc,
        user: updatedUser,
        isAuthenticated: true,
      });
    },

    login: async (email, password) => {
      set({ isLoading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simple validation - permit any email for mock
      if (!email.includes("@")) {
        set({ error: "Please enter a valid email address.", isLoading: false });
        return false;
      }
      if (password.length < 6) {
        set({ error: "Password must be at least 6 characters.", isLoading: false });
        return false;
      }

      // Check if location is already set
      const location = get().location;
      const user: User = {
        username: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        email,
        zone: location?.zone,
        area: location?.area,
      };

      localStorage.setItem("nectar_user", JSON.stringify(user));
      set({
        user,
        isAuthenticated: !!location,
        isLoading: false,
      });
      return true;
    },

    signUp: async (username, email, password) => {
      set({ isLoading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (username.trim().length < 3) {
        set({ error: "Username must be at least 3 characters.", isLoading: false });
        return false;
      }
      if (!email.includes("@")) {
        set({ error: "Please enter a valid email address.", isLoading: false });
        return false;
      }
      if (password.length < 6) {
        set({ error: "Password must be at least 6 characters.", isLoading: false });
        return false;
      }

      const location = get().location;
      const user: User = {
        username,
        email,
        zone: location?.zone,
        area: location?.area,
      };

      localStorage.setItem("nectar_user", JSON.stringify(user));
      set({
        user,
        isAuthenticated: !!location,
        isLoading: false,
      });
      return true;
    },

    logout: () => {
      localStorage.removeItem("nectar_user");
      localStorage.removeItem("nectar_location");
      set({
        user: null,
        tempPhoneNumber: null,
        location: null,
        isAuthenticated: false,
        otpCode: null,
        error: null,
      });
    },

    clearError: () => set({ error: null }),
  };
});
