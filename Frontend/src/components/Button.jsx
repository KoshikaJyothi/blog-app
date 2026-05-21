export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-semibold rounded transition-colors duration-200 flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#5f4bb6] via-[#3b82f6] to-[#a78bfa] text-white hover:from-[#3b82f6] hover:to-[#5f4bb6] disabled:bg-gray-400',
    secondary: 'bg-white border border-[#a78bfa] text-[#3b2f63] hover:bg-[#f3f0fa] hover:border-[#5f4bb6] disabled:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
    success: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400',
    ghost: 'bg-transparent text-[#5f4bb6] hover:text-[#3b82f6] hover:bg-[#f3f0fa] disabled:text-gray-400'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <span className="animate-spin">⏳</span> : children}
    </button>
  )
}
