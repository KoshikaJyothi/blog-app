import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Header() {
  const navigate = useNavigate()
  // Use individual selectors to force re-render on auth state change
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
    navigate('/')
  }

  const handleCreateArticle = () => {
    navigate('/create-article')
    setShowDropdown(false)
  }

  const handleViewArticles = () => {
    navigate('/articles')
    setShowDropdown(false)
  }

  const handleMyArticles = () => {
    navigate('/author-dashboard')
    setShowDropdown(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Debug log for authentication state
  console.log('Navbar state:', { isAuthenticated, user });

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="text-3xl font-extrabold tracking-tight text-[#c0392b] flex items-center gap-2">
          <span className="inline-block w-8 h-8 bg-[#c0392b] rounded-full mr-2"></span>
          Blog App
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="px-4 py-2 text-gray-700 hover:text-[#c0392b] font-medium rounded transition">Home</Link>
          {isAuthenticated ? (
            <>
              {user?.role === 'author' && (
                <Link to="/create-article" className="px-4 py-2 bg-[#c0392b] text-white rounded hover:bg-[#a93226] transition">Create Article</Link>
              )}
              {user?.role === 'admin' && (
                <Link to="/dashboard" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">Dashboard</Link>
              )}
              {/* User avatar and dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 focus:outline-none px-2"
                >
                  {user?.profileimgurl ? (
                    <img src={user.profileimgurl} alt={user?.name} className="w-9 h-9 rounded-full object-cover border-2 border-[#c0392b]" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#c0392b] flex items-center justify-center text-white font-bold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="hidden md:inline text-gray-700 font-semibold">{user?.name?.split(' ')[0]}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <button onClick={handleViewArticles} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"><span>📰</span> View Articles</button>
                      {user?.role === 'author' && (
                        <>
                          <button onClick={handleCreateArticle} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"><span>✍️</span> Create Article</button>
                          <button onClick={handleMyArticles} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"><span>📝</span> My Articles</button>
                        </>
                      )}
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><span>🚪</span> Logout</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-[#c0392b] border border-[#c0392b] rounded hover:bg-[#c0392b] hover:text-white transition">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-[#c0392b] text-white rounded hover:bg-[#a93226] transition">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
