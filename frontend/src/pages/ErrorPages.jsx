import { Link } from 'react-router-dom'
import { Button } from '../components/Button'

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mb-4">Page not found</p>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button variant="primary">Go Back Home</Button>
        </Link>
      </div>
    </div>
  )
}

export const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-2">403</h1>
        <p className="text-2xl font-semibold text-gray-700 mb-4">Access denied</p>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          You don't have permission to access this resource.
        </p>
        <Link to="/">
          <Button variant="primary">Go Back Home</Button>
        </Link>
      </div>
    </div>
  )
}
