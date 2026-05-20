import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { userService } from '../services/api'
import { Card, Loading, EmptyState, Alert } from '../components/Common'
import { Button } from '../components/Button'
import { ArticleCard } from '../components/ArticleCard'

export const HomePage = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await userService.getArticles()
      setArticles(response.data.articles || [])
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading text="Loading articles..." />

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold text-[#c0392b] mb-4 drop-shadow">Welcome to Blog App</h1>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl">Discover, create, and share inspiring stories from our amazing community of authors. Dive into a world of knowledge and creativity!</p>
        {!isAuthenticated && (
          <div className="flex gap-4 mb-10">
            <a href="/login" className="px-6 py-2 bg-[#c0392b] text-white rounded shadow hover:bg-[#a93226] transition">Login</a>
            <a href="/register" className="px-6 py-2 bg-gray-200 text-gray-800 rounded shadow hover:bg-gray-300 transition">Register</a>
          </div>
        )}
      </section>

      {/* Articles Section */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="mb-8 text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Latest Stories</h2>
          <p className="text-gray-600">Browse the newest articles from our authors</p>
        </div>

        {error && <Alert message={error} type="error" />}

        {articles.length === 0 ? (
          <EmptyState message="No articles published yet" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
