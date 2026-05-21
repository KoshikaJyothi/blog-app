import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Input } from '../components/FormFields'
import { Button } from '../components/Button'
import { Alert } from '../components/Common'
import toast from 'react-hot-toast'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login, loading, error, clearError } = useAuthStore()
  const [formData, setFormData] = useState({ email: '', password: '' })

  useEffect(() => {
    return () => clearError()
  }, [clearError])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(formData)
    if (result.success) {
      toast.success('Login successful!')
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h1>

        {error && <Alert message={error} type="error" />}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button 
            variant="primary" 
            size="md" 
            className="w-full"
            loading={loading}
            type="submit"
          >
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#c0392b] hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}
