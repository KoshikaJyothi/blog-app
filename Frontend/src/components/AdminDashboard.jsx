import { NavLink, Outlet } from 'react-router'
import {
  pageBackground,
  pageWrapper,
  headingClass,
  subHeadingClass,
  navLinkClass,
  navLinkActiveClass,
  divider,
  cardClass,
  bodyText,
  primaryBtn
} from '../styles/common'
import { useAuth } from '../../store/authStore'

function AdminDashboard() {
  const user = useAuth((state) => state.currentuser);

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        {/* Header */}
        <div className="mb-8">
          <h1 className={`${headingClass} mb-2`}>
            Admin Dashboard
          </h1>
          <p className={`${bodyText} text-lg`}>
            Welcome, {user?.firstName}! Manage users, authors, and platform content.
          </p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`${cardClass} text-center`}>
            <div className="text-3xl font-bold text-[#c0392b] mb-2">👥</div>
            <h3 className={`${subHeadingClass} mb-1`}>Users</h3>
            <p className={`${bodyText} text-sm`}>Manage user accounts</p>
          </div>

          <div className={`${cardClass} text-center`}>
            <div className="text-3xl font-bold text-[#4a7c59] mb-2">✍️</div>
            <h3 className={`${subHeadingClass} mb-1`}>Authors</h3>
            <p className={`${bodyText} text-sm`}>Oversee content creators</p>
          </div>

          <div className={`${cardClass} text-center`}>
            <div className="text-3xl font-bold text-[#c0392b] mb-2">📝</div>
            <h3 className={`${subHeadingClass} mb-1`}>Articles</h3>
            <p className={`${bodyText} text-sm`}>Review and moderate content</p>
          </div>

          <div className={`${cardClass} text-center`}>
            <div className="text-3xl font-bold text-[#7a6f68] mb-2">📊</div>
            <h3 className={`${subHeadingClass} mb-1`}>Analytics</h3>
            <p className={`${bodyText} text-sm`}>Platform insights</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-8 mb-8 border-b border-[#ddd7ce] pb-4">
          <NavLink
            to="users"
            className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
          >
            Manage Users
          </NavLink>

          <NavLink
            to="authors"
            className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
          >
            Manage Authors
          </NavLink>

          <NavLink
            to="articles"
            className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
          >
            Review Articles
          </NavLink>

          <NavLink
            to="settings"
            className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}
          >
            Platform Settings
          </NavLink>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard