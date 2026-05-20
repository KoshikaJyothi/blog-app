import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { userService, authorService } from '../services/api'
import { Input, FileInput, Select } from '../components/FormFields'
import { Button } from '../components/Button'
import { Alert, Loading } from '../components/Common'
import toast from 'react-hot-toast'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    profilePic: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Only JPG and PNG files allowed')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }
      setFormData(prev => ({ ...prev, profilePic: file }))
      setPreview(URL.createObjectURL(file))
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const fd = new FormData()
      fd.append('name', formData.name)
      fd.append('email', formData.email)
      fd.append('password', formData.password)
      if (formData.profilePic) {
        fd.append('profilePic', formData.profilePic)
      }

      const service = formData.role === 'author' ? authorService : userService
      const response = await service.registerUser(fd)

      if (response.data.message === 'user created') {
        toast.success('Registration successful! Please login.')
        navigate('/login')
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message
      setError(errMsg)
      toast.error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading text="Creating your account..." />

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Join Us</h1>

        {error && <Alert message={error} type="error" />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />

          <Select
            label="Account Type"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={[
              { value: 'user', label: 'Reader' },
              { value: 'author', label: 'Author' }
            ]}
          />

          <FileInput
            label="Profile Picture"
            name="profilePic"
            onChange={handleFileChange}
            accept="image/jpeg,image/png"
          />

          {preview && (
            <div className="flex justify-center">
              <img src={preview} alt="Preview" className="w-24 h-24 rounded-full object-cover border" />
            </div>
          )}

          <Button 
            variant="primary" 
            size="md" 
            className="w-full"
            loading={loading}
            type="submit"
          >
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#c0392b] hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}
