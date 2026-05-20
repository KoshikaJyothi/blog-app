import React from 'react'
import { useNavigate } from 'react-router-dom'
import { pageWrapper, pageTitleClass, primaryBtn, section, mutedText } from '../styles/style'
import { useStore } from '../store/Store'

function AuthorDashboard() {
  const navigate = useNavigate()
  const currentUser = useStore((state) => state.currentuser)

  return (
    <div className={pageWrapper}>
      <header className="mb-12 flex justify-between items-end border-b border-[#ddd7ce] pb-6">
        <div>
          <h1 className={pageTitleClass}>Author Desk</h1>
          <p className={`${mutedText} mt-2`}>Welcome back, {currentUser?.name || 'Author'}. Here are your published stories.</p>
        </div>
        <button 
          onClick={() => navigate('/author-dashboard/add-article')} 
          className={primaryBtn}
        >
          Write a Story
        </button>
      </header>

      <section className={section}>
        {/* Placeholder for Author's Articles List - you can implement fetching from /author-api/articles/:username later */}
        <div className="bg-[#f4f0ea] border border-[#ddd7ce] rounded-sm p-12 text-center">
            <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1a1410] mb-2">No stories yet</h3>
            <p className="font-['Lora'] text-[#7a6f68] italic mb-6">Start writing to share your ideas with our readers.</p>
            <button 
              onClick={() => navigate('/author-dashboard/add-article')} 
              className={primaryBtn}
            >
              Start Writing
            </button>
        </div>
      </section>
    </div>
  )
}

export default AuthorDashboard