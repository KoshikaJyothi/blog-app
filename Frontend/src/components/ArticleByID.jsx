import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/authStore";

import {
  pageBackground,
  pageWrapper,
  articlePageTitle,
  articlePageCategory,
  articlePageMeta,
  articlePageContent,
  articlePageAuthor,
  articlePageTimestamp,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  bodyText,
} from "../styles/common.js";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentuser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (article) return;

    const getArticle = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`${API_BASE_URL}/user-api/article/${id}`, { withCredentials: true });

        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id, article]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // delete article
  const deleteArticle = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/author-api/article/${id}`, { withCredentials: true });

      navigate("/author-profile");
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  const editArticle = (articleObj) => {
    navigate(`/edit-article/${articleObj._id}`, { state: articleObj });
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        {/* Back button */}
        <button 
          onClick={() => navigate("/articles")}
          className={`${bodyText} text-[#c0392b] hover:text-[#922b21] mb-8 flex items-center gap-2 transition-colors`}
        >
          ← Back to Articles
        </button>

        {/* Article Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={articlePageCategory}>{article.category}</span>
            {article.status && (
              <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 bg-[#ede8df] text-[#7a6f68] rounded-sm">
                {article.status}
              </span>
            )}
          </div>
          <h1 className={`${articlePageTitle} mb-6`}>{article.title}</h1>
          
          {/* Article Meta */}
          <div className={`${articlePageMeta} flex flex-wrap items-center gap-6 pb-6 border-b border-[#ddd7ce]`}>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#1a1410]">By </span>
              <span className={articlePageAuthor}>
                {article.author?.firstName} {article.author?.lastName}
              </span>
            </div>
            <span className="text-[#7a6f68]">•</span>
            <span className={articlePageTimestamp}>
              {formatDate(article.createdAt)}
            </span>
            {article.updatedAt && article.updatedAt !== article.createdAt && (
              <>
                <span className="text-[#7a6f68]">•</span>
                <span className="text-sm text-[#7a6f68] italic">
                  Updated {formatDate(article.updatedAt)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className={`${articlePageContent} mb-12 prose prose-sm max-w-none`}>
          {article.content}
        </div>

        {/* Author Actions */}
        {user?.role === "AUTHOR" && user?._id === article.author?._id && (
          <div className="flex gap-3 pt-8 border-t border-[#ddd7ce]">
            <button 
              className={editBtn} 
              onClick={() => editArticle(article)}
            >
              Edit Article
            </button>
            <button 
              className={deleteBtn}
              onClick={deleteArticle}
            >
              Delete Article
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleByID;