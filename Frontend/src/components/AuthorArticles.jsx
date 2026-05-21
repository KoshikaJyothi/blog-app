import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { useNavigate } from "react-router";
import { useAuth } from "../../store/authStore";
import {
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  loadingClass,
  errorClass,
  emptyStateClass,
  pageWrapper,
  headingClass,
} from "../styles/common";

function AuthorArticles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentuser = useAuth((state) => state.currentuser);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, { state: articleObj });
  };

  useEffect(() => {
    if (!currentuser) return;

    const fetchAuthorArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const authorId = currentuser._id || currentuser.userId;
        const res = await axios.get(
          `${API_BASE_URL}/author-api/articles/${authorId}`,
          { withCredentials: true }
        );
        setArticles(res.data.articles || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load your articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorArticles();
  }, [currentuser]);

  return (
    <div className={pageWrapper}>
      <h2 className={headingClass}>Your Articles</h2>

      {loading && <p className={loadingClass}>Loading your articles...</p>}

      {!loading && error && <p className={errorClass}>{error}</p>}

      {!loading && !error && articles.length === 0 && (
        <p className={emptyStateClass}>You haven't published any articles yet.</p>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className={articleGrid}>
          {articles.map((article) => (
            <div className={articleCardClass} key={article._id}>
              <h3 className={articleTitle}>{article.title}</h3>
              <p className={articleExcerpt}>Category: {article.category}</p>
              <button
                className="text-blue-500 mt-auto pt-4 text-left"
                onClick={() => navigateToArticleByID(article)}
              >
                View / Edit →
              </button>
              <p className={articleMeta}>{formatDate(article.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthorArticles;
