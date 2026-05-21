import React, { useEffect, useState } from 'react'
import {
  pageBackground,
  pageWrapper,
  pageTitleClass,
  bodyText,
  articleGridModern,
  articleCardModern,
  articleTitleModern,
  articleMetaRow,
  articleExcerptModern,
  articleCategoryBadge,
  articleReadMoreBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
} from '../styles/common'
import axios from 'axios'
import API_BASE_URL from '../config/api'
import { useNavigate } from 'react-router'

function Articles() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, { state: articleObj })
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
        <div className="mb-16 text-center">
          <h1 className={pageTitleClass}>
            Literary Collection
          </h1>
          <p className={`${bodyText} text-lg max-w-2xl mx-auto mt-4`}>
            Discover compelling stories, insightful essays, and thought-provoking content from our community of writers.
          </p>
        </div>

        {/* Loading State */}
        {loading && <p className={loadingClass}>Loading articles…</p>}

        {/* Error State */}
        {!loading && error && <p className={errorClass}>{error}</p>}

        {/* Empty State */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-16">
            <p className={emptyStateClass}>No articles found yet.</p>
            <p className={`${bodyText} text-center mt-2`}>Check back soon for new stories and insights.</p>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && articles.length > 0 && (
          <div className={articleGridModern}>
            {articles.map((article) => (
              <article 
                className={articleCardModern}
                key={article._id}
                onClick={() => navigateToArticleByID(article)}
              >
                {/* Category Badge */}
                <div className="mb-3">
                  <span className={articleCategoryBadge}>
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className={articleTitleModern}>
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className={articleExcerptModern}>
                  {article.content?.substring(0, 140)}...
                </p>

                {/* Meta Information */}
                <div className={articleMetaRow}>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1a1410] text-sm">
                      {article.author?.firstName} {article.author?.lastName}
                    </p>
                    <p className="text-xs text-[#7a6f68]">
                      {formatDate(article.createdAt)}
                    </p>
                  </div>
                  <button className={articleReadMoreBtn}>
                    Read
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Articles
