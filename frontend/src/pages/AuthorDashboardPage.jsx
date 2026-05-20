import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authorService } from '../services/api'
import { Button } from '../components/Button'
import { Card, Loading, EmptyState, Alert } from '../components/Common'
import { Modal } from '../components/Modal'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export const AuthorDashboardPage = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [articles, setArticles] = useState([])
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, articleId: null })
  const [deleting, setDeleting] = useState(false)
  const [restoring, setRestoring] = useState(false)

  useEffect(() => {
    if (user?.role !== 'author') {
      navigate('/')
    } else {
      fetchArticles()
    }
  }, [user, navigate])

  const fetchArticles = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await authorService.getArticles()
      if (response.data.articles) {
        setArticles(response.data.articles)
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message
      setError(errMsg)
      toast.error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteModal.articleId) return

    setDeleting(true)
    try {
      const response = await authorService.deleteArticle(deleteModal.articleId)
      if (response.data.message === 'article deleted') {
        toast.success('Article deleted successfully')
        setArticles(articles.filter(a => a._id !== deleteModal.articleId))
        setDeleteModal({ isOpen: false, articleId: null })
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setDeleting(false)
    }
  }

  const handleRestore = async (articleId) => {
    setRestoring(true)
    try {
      const response = await authorService.restoreArticle(articleId)
      if (response.data.message === 'article restored') {
        toast.success('Article restored successfully')
        setArticles(articles.map(a => a._id === articleId ? { ...a, isArticleActive: true } : a))
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setRestoring(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Articles</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/create-article')}
        >
          Write New Article
        </Button>
      </div>

      {error && <Alert message={error} type="error" />}

      {loading ? (
        <Loading text="Loading your articles..." />
      ) : articles.length === 0 ? (
        <EmptyState message="You haven't published any articles yet" />
      ) : (
        <div className="grid gap-4">
          {articles.map(article => (
            <Card key={article._id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {article.category} • {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 line-clamp-2">{article.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {article.comments?.length || 0} comments • Status: <span className={article.isArticleActive ? 'text-green-600' : 'text-red-600'}>{article.isArticleActive ? 'Published' : 'Deleted'}</span>
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  {article.isArticleActive ? (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(`/edit-article/${article._id}`, { state: { article } })}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setDeleteModal({ isOpen: true, articleId: article._id })}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleRestore(article._id)}
                      loading={restoring}
                    >
                      Restore
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={deleteModal.isOpen}
        title="Delete Article"
        confirmText="Delete"
        onClose={() => setDeleteModal({ isOpen: false, articleId: null })}
        onConfirm={handleDelete}
        type="confirm"
        loading={deleting}
      >
        <p className="text-gray-700">
          Are you sure you want to delete this article? This action cannot be undone.
        </p>
      </Modal>
    </div>
  )
}
