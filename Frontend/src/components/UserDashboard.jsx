import React, { useEffect, useState } from 'react'
import {
  pageBackground,
  pageWrapper,
  headingClass,
  subHeadingClass,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  loadingClass,
  errorClass,
  emptyStateClass,
  authorNameClass,
  authorTagClass,
  primaryBtn,
  cardClass,
  bodyText
} from '../styles/common'
import axios from 'axios'
import API_BASE_URL from '../config/api'
import { useNavigate } from 'react-router'
import { useAuth } from '../../store/authStore'

function UserDashboard() {
  const navigate = useNavigate()
  const user = useAuth((state) => state.currentuser)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`)
  }

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await axios.get(`${API_BASE_URL}/user-api/articles`, {
          withCredentials: true,
        })
        setArticles(res.data.articles || [])
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load articles.')
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className={`${headingClass} mb-2`}>
                Welcome back, {user?.firstName}!
              </h1>
              <p className={`${bodyText} text-lg`}>
                Discover new stories and perspectives from our community of writers.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/articles')}
                className={primaryBtn}
              >
                Browse Articles
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className={`${cardClass} text-center`}>
            <div className="text-3xl font-bold text-[#c0392b] mb-2">
              {articles.length}
            </div>
            <p className={`${bodyText} font-medium`}>Articles Available</p>
          </div>
          <div className={`${cardClass} text-center`}>
            <div className="text-3xl font-bold text-[#4a7c59] mb-2">
              ∞
            </div>
            <p className={`${bodyText} font-medium`}>Stories to Discover</p>
          </div>
          <div className={`${cardClass} text-center`}>
            <div className="text-3xl font-bold text-[#c0392b] mb-2">
              ✍️
            </div>
            <p className={`${bodyText} font-medium`}>Community Writers</p>
          </div>
        </div>

        {/* Articles Section */}
        <section>
          <h2 className={`${subHeadingClass} mb-8`}>
            Latest Articles
          </h2>

          {loading && <p className={loadingClass}>Loading articles…</p>}

          {!loading && error && <p className={errorClass}>{error}</p>}

          {!loading && !error && articles.length === 0 && (
            <p className={emptyStateClass}>No articles found.</p>
          )}

          {!loading && !error && articles.length > 0 && (
            <div className={articleGrid}>
              {articles.map((article) => (
                <div className={articleCardClass} key={article._id}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={authorNameClass}>
                      {article.author?.firstName} {article.author?.lastName}
                    </div>
                    <span className={authorTagClass}>
                      Author
                    </span>
                  </div>

                  <h3 className={articleTitle}>{article.title}</h3>
                  <p className={articleExcerpt}>
                    {article.content?.substring(0, 120)}...
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className={articleMeta}>
                      {article.category}
                    </span>
                    <span className={articleMeta}>
                      {formatDate(article.createdAt)}
                    </span>
                  </div>

                  <button
                    className="text-[#c0392b] hover:text-[#922b21] font-medium mt-4 transition-colors"
                    onClick={() => navigateToArticleByID(article)}
                  >
                    Read Article →
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default UserDashboard