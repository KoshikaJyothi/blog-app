import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  loadingClass,
} from "../styles/common";
import { useAuth } from "../../store/authStore";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(location.state || null);

  const currentuser = useAuth((state) => state.currentuser);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch article if not provided in state
  useEffect(() => {
    if (article) return;

    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user-api/article/${id}`, { withCredentials: true });
        setArticle(res.data.payload);
      } catch {
        toast.error("Failed to load article data");
      }
    };

    fetchArticle();
  }, [id, article]);

  // prefill form when article data is available
  useEffect(() => {
    if (!article) return;

    setValue("title", article.title);
    setValue("category", article.category);
    setValue("content", article.content);
  }, [article, setValue]);

  const updateArticle = async (data) => {
    if (!currentuser || !article) {
      toast.error("Unauthorized or missing article data");
      return;
    }

    try {
      setLoading(true);
      const authorId = currentuser._id || currentuser.userId;
      const res = await axios.put(
        `${API_BASE_URL}/author-api/articles/${article._id}/${authorId}`,
        data,
        { withCredentials: true }
      );

      toast.success("Article updated successfully!");
      navigate(`/article/${article._id}`, { state: res.data.article });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${formCard} mt-10`}>
      <h2 className={formTitle}>Edit Article</h2>

      <form onSubmit={handleSubmit(updateArticle)}>
        {/* Title */}
        <div className={formGroup}>
          <label className={labelClass}>Title</label>

          <input className={inputClass} {...register("title", { required: "Title required" })} />

          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div className={formGroup}>
          <label className={labelClass}>Category</label>

          <select className={inputClass} {...register("category", { required: "Category required" })}>
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>

          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>

        {/* Content */}
        <div className={formGroup}>
          <label className={labelClass}>Content</label>

          <textarea rows="14" className={inputClass} {...register("content", { required: "Content required" })} />

          {errors.content && <p className={errorClass}>{errors.content.message}</p>}
        </div>

        <button className={submitBtn} disabled={loading}>
          {loading ? "Updating..." : "Update Article"}
        </button>

        {loading && <p className={loadingClass}>Updating article...</p>}
      </form>
    </div>
  );
}

export default EditArticle;