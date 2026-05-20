import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute'
import Header from './components/Header'
import Footer from './components/Footer'

import ErrorBoundary from './components/ErrorBoundary'

// Pages
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { HomePage } from './pages/HomePage'
import { ArticleDetailPage } from './pages/ArticleDetailPage'
import { CreateArticlePage } from './pages/CreateArticlePage'
import { EditArticlePage } from './pages/EditArticlePage'
import { AuthorDashboardPage } from './pages/AuthorDashboardPage'
import { AdminDashboardPage } from './pages/AdminDashboardPage'


import AllArticlesPage from './pages/AllArticlesPage'
import DashboardRedirect from './pages/DashboardRedirect'
import { UnauthorizedPage, NotFoundPage } from './pages/ErrorPages'

function App() {

  const initializeAuth = useAuthStore((state) => state.initializeAuth)
  const initialized = useAuthStore((state) => state.initialized)
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/articles" element={<AllArticlesPage />} />
              <Route path="/articles/:id" element={<ArticleDetailPage />} />
              {/* Auth Routes */}
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                } 
              />
              {/* Dashboard Route - Smart Redirect */}
              <Route path="/dashboard" element={<DashboardRedirect />} />
              {/* Author Routes */}
              <Route 
                path="/create-article" 
                element={
                  <ProtectedRoute requiredRole="author">
                    <CreateArticlePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/edit-article/:id" 
                element={
                  <ProtectedRoute requiredRole="author">
                    <EditArticlePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/author-dashboard" 
                element={
                  <ProtectedRoute requiredRole="author">
                    <AuthorDashboardPage />
                  </ProtectedRoute>
                } 
              />
              {/* Admin Routes */}
              <Route 
                path="/admin-dashboard" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } 
              />
              {/* Error Routes */}
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="/not-found" element={<NotFoundPage />} />
              {/* Catch all - 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
