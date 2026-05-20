import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Common API
export const authService = {
  login: (credentials) => api.post('/common-api/login', credentials),
  logout: () => api.post('/common-api/logout'),
  changePassword: (data) => api.post('/common-api/changePassword', data)
}

// User API
export const userService = {
  registerUser: (formData) => api.post('/user-api/users', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getArticles: () => api.get('/user-api/articles'),
  addComment: (articleId, comment) => api.post(`/user-api/articles/${articleId}/comments`, { comment })
}

// Author API
export const authorService = {
  registerUser: (formData) => api.post('/author-api/users', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  // Article operations
  getArticles: () => api.get('/author-api/articles'),
  getArticle: (articleId) => api.get(`/author-api/articles/${articleId}`),
  createArticle: (data) => api.post('/author-api/articles', data),
  updateArticle: (articleId, data) => api.put(`/author-api/articles/${articleId}`, data),
  deleteArticle: (articleId) => api.delete(`/author-api/articles/${articleId}`),
  restoreArticle: (articleId) => api.put(`/author-api/articles/${articleId}/restore`),
  // Profile operations
  getProfile: () => api.get('/author-api/profile'),
  updateProfile: (formData) => api.put('/author-api/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteAccount: () => api.delete('/author-api/profile')
}

// Admin API
export const adminService = {
  blockUser: (userId) => api.put('/admin-api/blockUser', { userId }),
  unblockUser: (userId) => api.put('/admin-api/unblockUser', { userId })
}

export default api
