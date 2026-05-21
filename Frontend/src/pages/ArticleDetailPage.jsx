import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { userService } from '../services/api'
import { Input } from '../components/FormFields'
import { Button } from '../components/Button'
import { Alert, Loading, Card } from '../components/Common'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export const ArticleDetailPage = () => {
  const { id } = useParams()
  const { isAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [commenting, setCommenting] = useState(false)
  const [comment, setComment] = useState('')
  const [article, setArticle] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchArticle()
  }, [id])

  const fetchArticle = async () => {
    try {
      const response = await userService.getArticles()
      const foundArticle = response.data.articles.find(a => a._id === id)
      if (foundArticle) {
        setArticle(foundArticle)
      } else {
        setError('Article not found')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) {
      toast.error('Please enter a comment')
      return
    }

    setCommenting(true)
    try {
      await userService.addComment(id, comment)
      toast.success('Comment added successfully!')
      setComment('')
      fetchArticle()
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setCommenting(false)
    }
  }

  if (loading) return <Loading text="Loading article..." />

  if (error) return <Alert message={error} type="error" />

  if (!article) return <Alert message="Article not found" type="error" />

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <article className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="mb-6">
          <span className="inline-block text-sm font-semibold text-[#c0392b] bg-red-50 px-3 py-1 rounded mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{article.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <span>{new Date(article.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            {article.author && (
              <>
                <span>by</span>
                <div className="flex items-center gap-2">
                  {article.author.image && (
                    <img src={article.author.image} alt={article.author.name} className="w-6 h-6 rounded-full" />
                  )}
                  <span className="font-semibold">{article.author.name}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{article.content}</p>
        </div>
      </article>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments ({article.comments?.length || 0})</h2>

        {isAuthenticated && (
          <form onSubmit={handleAddComment} className="mb-8 pb-8 border-b">
            <div className="mb-4">
              <Input
                label="Add a comment"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
              />
            </div>
            <Button
              variant="primary"
              type="submit"
              loading={commenting}
              disabled={commenting}
            >
              Post Comment
            </Button>
          </form>
        )}

        {!isAuthenticated && (
          <p className="text-gray-600 mb-8 text-center">
            <a href="/login" className="text-[#c0392b] hover:underline font-semibold">Login</a> to comment on this article
          </p>
        )}

        {article.comments && article.comments.length > 0 ? (
          <div className="space-y-4">
            {article.comments.map((cmt, idx) => (
              <Card key={idx} className="p-4">
                <p className="text-gray-800 mb-2">{cmt.comment}</p>
                <p className="text-xs text-gray-500">User ID: {cmt.userId}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
}
