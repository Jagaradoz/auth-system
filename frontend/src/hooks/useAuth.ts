import { create } from "zustand";
import axios from "axios";
import type { AuthState } from "../types/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL!;

const useAuth = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const response = await axios.post(
      `${BACKEND_URL}/api/auth/login`,
      { email, password },
      { withCredentials: true },
    );

    set({
      user: { id: response.data.id, email: response.data.email },
      accessToken: response.data.accessToken,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    const { accessToken } = get();

    try {
      await axios.post(
        `${BACKEND_URL}/api/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
      );
    } finally {
      set({ user: null, accessToken: null, isAuthenticated: false });
    }
  },

  refresh: async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/refresh`,
        {},
        { withCredentials: true },
      );

      set({
        user: { id: response.data.id, email: response.data.email },
        accessToken: response.data.accessToken,
        isAuthenticated: true,
      });

      return true;
    } catch {
      set({ user: null, accessToken: null, isAuthenticated: false });
      return false;
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    await get().refresh();
    set({ isLoading: false });
  },
}));

export default useAuth;
