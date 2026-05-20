import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { authorService } from '../services/api'
import { Input, Textarea, Select } from '../components/FormFields'
import { Button } from '../components/Button'
import { Alert, Loading } from '../components/Common'
import { validateForm } from '../utils/validation'
import toast from 'react-hot-toast'

export const EditArticlePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: ''
  })

  useEffect(() => {
    if (location.state?.article) {
      setFormData({
        title: location.state.article.title,
        category: location.state.article.category,
        content: location.state.article.content
      })
      setLoading(false)
    } else if (id) {
      // Fetch article if not passed in state
      fetchArticle()
    }
  }, [location.state, id])

  const fetchArticle = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await authorService.getArticle(id)
      if (response.data.article) {
        setFormData({
          title: response.data.article.title,
          category: response.data.article.category,
          content: response.data.article.content
        })
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message
      setError(errMsg)
      toast.error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate
    const fields = [
      { name: 'title', type: 'text', label: 'Title' },
      { name: 'category', type: 'select', label: 'Category' },
      { name: 'content', type: 'textarea', label: 'Content' }
    ]
    const validationErrors = validateForm(formData, fields)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      const response = await authorService.updateArticle(id, formData)
      if (response.data.message === 'article updated') {
        toast.success('Article updated successfully!')
        navigate('/author-dashboard')
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message
      setError(errMsg)
      toast.error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Edit Article</h1>
        <p className="text-gray-600 mt-2">Update your article content</p>
      </div>

      {error && <Alert message={error} type="error" />}

      {loading ? (
        <Loading text="Loading article details..." />
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <Input
            label="Article Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter article title"
            error={errors.title}
          />

          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={[
              { value: 'Technology', label: 'Technology' },
              { value: 'Lifestyle', label: 'Lifestyle' },
              { value: 'Business', label: 'Business' },
              { value: 'Arts', label: 'Arts' },
              { value: 'Science', label: 'Science' }
            ]}
            error={errors.category}
          />

          <Textarea
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your article content here..."
            rows="12"
            error={errors.content}
          />

          <div className="flex gap-4">
            <Button
              variant="primary"
              size="md"
              loading={loading}
              type="submit"
              className="flex-1"
            >
              Update Article
            </Button>
            <Button
              variant="secondary"
              size="md"
              type="button"
              onClick={() => navigate('/author-dashboard')}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
