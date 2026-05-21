import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-[#5f4bb6] via-[#3b82f6] to-[#a78bfa] text-white mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-extrabold mb-3 tracking-tight text-white">Blog App</h3>
            <p className="text-[#e0e7ff] text-base">
              A platform for sharing and discovering inspiring articles.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#e0e7ff] hover:text-white font-medium transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-[#e0e7ff] hover:text-white font-medium transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-[#e0e7ff] hover:text-white font-medium transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Contact</h4>
            <p className="text-[#e0e7ff]">Email: info@blogapp.com</p>
            <p className="text-[#e0e7ff]">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-[#e0e7ff] text-sm">
          <p>&copy; {currentYear} Blog App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
