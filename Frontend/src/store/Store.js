import { create } from "zustand";
import { authService, userService } from "../services/api";

export const useStore = create((set) => ({
  currentuser: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  role: null,

  login: async (userCred) => {
    try {
      set({ loading: true, error: null });

      const res = await authService.login(userCred);

      set({
        loading: false,
        currentuser: res.data.payload,
        isAuthenticated: true,
        error: null,
        role: res.data.payload.role
      });

    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
      });
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });

      await authService.logout();

      set({
        currentuser: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        role: null
      });

    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message
      });
    }
  },

  articles: [],
  fetchArticles: async () => {
    try {
      set({ loading: true, error: null });
      const res = await userService.getArticles();
      set({ articles: res.data.articles, loading: false });
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || error.message });
    }
  },

  checkAuth: async () => {
    try {
      set({ loading: true, error: null });
      // Note: You may need to add a checkAuth endpoint to your backend if it doesn't exist
      // For now, we'll just verify by checking localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        set({
          loading: false,
          currentuser: user,
          isAuthenticated: true,
          error: null,
          role: user.role
        });
      } else {
        set({
          loading: false,
          currentuser: null,
          isAuthenticated: false,
          role: null
        });
      }
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
        currentuser: null,
        isAuthenticated: false,
        role: null
      });
    }
  }
}));