import { NavLink, Outlet } from "react-router";
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
} from "../styles/common";
import { useAuth } from "../../store/authStore";

function AuthorDashboard() {
  const user = useAuth((state) => state.currentuser);

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        {/* Header */}
        <div className="mb-8">
          <h1 className={`${headingClass} mb-2`}>
            Author Dashboard
          </h1>
          <p className={`${bodyText} text-lg`}>
            Welcome back, {user?.firstName}! Manage your articles and create new content.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`${cardClass} text-center`}>
            <div className="text-3xl mb-3">📝</div>
            <h3 className={`${subHeadingClass} mb-2`}>Write New Article</h3>
            <p className={`${bodyText} mb-4`}>
              Share your thoughts and stories with the world.
            </p>
            <NavLink to="write-article" className={primaryBtn}>
              Start Writing
            </NavLink>
          </div>

          <div className={`${cardClass} text-center`}>
            <div className="text-3xl mb-3">📚</div>
            <h3 className={`${subHeadingClass} mb-2`}>My Articles</h3>
            <p className={`${bodyText} mb-4`}>
              View and manage your published works.
            </p>
            <NavLink to="articles" className={primaryBtn}>
              View Articles
            </NavLink>
          </div>

          <div className={`${cardClass} text-center`}>
            <div className="text-3xl mb-3">📊</div>
            <h3 className={`${subHeadingClass} mb-2`}>Analytics</h3>
            <p className={`${bodyText} mb-4`}>
              Track your article performance and engagement.
            </p>
            <button className={primaryBtn} disabled>
              Coming Soon
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-8 mb-8 border-b border-[#ddd7ce] pb-4">
          <NavLink
            to="articles"
            className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass
            }
          >
            My Articles
          </NavLink>

          <NavLink
            to="write-article"
            className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass
            }
          >
            Write New Article
          </NavLink>

          <NavLink
            to="drafts"
            className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass
            }
          >
            Drafts
          </NavLink>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthorDashboard;