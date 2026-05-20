export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition ${className}`}>
      {children}
    </div>
  )
}

export const Alert = ({ message, type = 'info' }) => {
  const bgColors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  return (
    <div className={`border rounded-lg p-4 ${bgColors[type]}`}>
      {message}
    </div>
  )
}

export const Loading = ({ text = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c0392b] mr-3"></div>
      <span className="text-gray-600">{text}</span>
    </div>
  )
}

export const EmptyState = ({ message = 'No data found' }) => {
  return (
    <div className="flex items-center justify-center py-16">
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  )
}
