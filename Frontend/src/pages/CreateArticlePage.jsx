import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authorService } from '../services/api'
import { Input, Textarea, Select } from '../components/FormFields'
import { Button } from '../components/Button'
import { Alert, Loading } from '../components/Common'
import { validateForm } from '../utils/validation'
import { useAuthStore } from '../store/authStore'

export const CreateArticlePage = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: ''
  })

  // Check authentication
  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  if (user?.role !== 'author') {
    navigate('/unauthorized')
    return null
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

    console.log('Form data:', formData)
    console.log('Current user:', user)

    // Validate
    const fields = [
      { name: 'title', type: 'text', label: 'Title' },
      { name: 'category', type: 'select', label: 'Category' },
      { name: 'content', type: 'textarea', label: 'Content' }
    ]
    const validationErrors = validateForm(formData, fields)

    console.log('Validation errors:', validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      console.log('Submitting article...')
      const response = await authorService.createArticle(formData)
      console.log('Response:', response)
      if (response.data.message === 'article created') {
        toast.success('Article published successfully!')
        navigate('/author-dashboard')
      }
    } catch (err) {
      console.error('Create article error:', err)
      
      // Check if it's an authentication error
      if (err.response?.status === 401) {
        setError('Your session has expired. Please login again.')
        toast.error('Session expired. Please login again.')
        // The app will handle the redirect through the auth-expired event
        return
      }
      
      const errMsg = err.response?.data?.message || err.message
      setError(`Failed to create article: ${errMsg}`)
      toast.error(`Failed to create article: ${errMsg}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Publish New Article</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name} ({user?.role})</p>
      </div>

      {error && <Alert message={error} type="error" />}

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
            Publish Article
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
    </div>
  )
}
