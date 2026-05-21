import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { authorService } from '../services/api'
import { pageWrapper, pageTitleClass, formCard, formGroup, labelClass, inputClass, submitBtn, secondaryBtn } from '../styles/style'

function AddArticle() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await authorService.createArticle(data)
      if (res.status === 201) {
        toast.success("Article published successfully")
        navigate('/author-dashboard')
      }
    } catch (err) {
      // Check if it's an authentication error
      if (err.response?.status === 401) {
        toast.error('Your session has expired. Please login again.')
        // The app will handle the redirect through the auth-expired event
        return
      }
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={pageWrapper}>
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 flex justify-between items-center border-b border-[#ddd7ce] pb-6">
          <h1 className={pageTitleClass}>Draft a New Story</h1>
          <button onClick={() => navigate('/author-dashboard')} className={secondaryBtn}>
            Cancel
          </button>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className={formGroup}>
            <label className={labelClass}>Title</label>
            <input 
              type="text" 
              className={`${inputClass} text-lg font-['Playfair_Display'] placeholder:font-['DM_Sans']`} 
              placeholder="Enter a captivating title..."
              {...register('title', { required: "Title is required" })}
            />
            {errors.title && <span className="text-red-600 text-xs mt-1 block">{errors.title.message}</span>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Category</label>
            <select 
              className={inputClass}
              {...register('category', { required: "Category is required" })}
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Business">Business</option>
              <option value="Arts">Arts</option>
              <option value="Science">Science</option>
            </select>
            {errors.category && <span className="text-red-600 text-xs mt-1 block">{errors.category.message}</span>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Content</label>
            <textarea 
              className={`${inputClass} min-h-75 resize-y font-['Lora'] text-base leading-relaxed`} 
              placeholder="Write your story here..."
              {...register('content', { required: "Content is required" })}
            />
            {errors.content && <span className="text-red-600 text-xs mt-1 block">{errors.content.message}</span>}
          </div>

          <div className="pt-4">
            <button type="submit" className={`${submitBtn} w-auto px-10`} disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddArticle