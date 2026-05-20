import { create } from 'zustand'
import { authService, userService, authorService } from '../services/api'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  initialized: false,

  login: async (credentials) => {
    set({ loading: true, error: null })
    try {
      const response = await authService.login(credentials)
      const user = response.data.payload
      set({ user, isAuthenticated: true, loading: false, initialized: true })
      localStorage.setItem('user', JSON.stringify(user))
      return { success: true }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message
      set({ error: errorMsg, loading: false })
      return { success: false, error: errorMsg }
    }
  },

  logout: async () => {
    set({ loading: true })
    try {
      await authService.logout()
      set({ user: null, isAuthenticated: false, loading: false, initialized: true })
      localStorage.removeItem('user')
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      set({ user: null, isAuthenticated: false, loading: false, initialized: true })
      localStorage.removeItem('user')
      return { success: true }
    }
  },

  clearError: () => set({ error: null }),

  setUser: (user) => {
    set({ user, isAuthenticated: !!user })
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  },

  initializeAuth: async () => {
    set({ loading: true })
    try {
      // First check localStorage
      const savedUser = localStorage.getItem('user')
      
      if (savedUser) {
        const user = JSON.parse(savedUser)
        console.log('Initializing auth for user:', user)
        // Verify token is still valid by making a protected request based on user role
        try {
          // Call the appropriate endpoint based on user role
          if (user.role === 'author') {
            await authorService.getArticles()
          } else if (user.role === 'admin') {
            // For admin, we could call an admin endpoint if available
            // For now, just restore the user since token is in httpOnly cookie
            set({ user, isAuthenticated: true, loading: false, initialized: true })
            return
          } else {
            // Regular user
            await userService.getArticles()
          }
          // Token is valid, restore user
          set({ user, isAuthenticated: true, loading: false, initialized: true })
          return
        } catch (err) {
          console.error('Token verification failed:', err)
          // Token is invalid (401), clear auth
          if (err.response?.status === 401) {
            localStorage.removeItem('user')
            set({ user: null, isAuthenticated: false, loading: false, initialized: true })
            return
          }
          // Other errors, still restore from localStorage but mark as initialized
          set({ user, isAuthenticated: true, loading: false, initialized: true })
          return
        }
      }
      
      // No saved user
      console.log('No saved user found')
      set({ user: null, isAuthenticated: false, loading: false, initialized: true })
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ user: null, isAuthenticated: false, loading: false, initialized: true })
    }
  }
}))

export const useArticleStore = create((set) => ({
  articles: [],
  loading: false,
  error: null,

  setArticles: (articles) => set({ articles }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null })
}))
