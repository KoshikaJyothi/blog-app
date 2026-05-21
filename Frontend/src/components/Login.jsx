import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../store/authStore'
import { useNavigate } from 'react-router'
import { toast }from 'react-hot-toast'
import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  loadingClass,
  bodyText,
} from '../styles/common'

function Login() {
  const { register, handleSubmit} = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
const login=useAuth(state=>state.login)
const currentUser=useAuth(state=>state.currentuser)
const isAuthenticated=useAuth(state=>state.isAuthenticated)
const navigate=useNavigate()
const onUserLogin=async(userCredWithRole)=>{
    try{
      setLoading(true)
      setError(null)
      await login(userCredWithRole)
    }catch(err){
      setError(err.message || 'Login failed. Please try again.')
    }finally{
      setLoading(false)
    }
}
useEffect(()=>{
    
    if(isAuthenticated)
    {
      if(currentUser?.role==='USER')
      {
        navigate('/user-profile')
        toast.success('User Logined successfully')
      }
      else if(currentUser?.role==='AUTHOR')
      {
        navigate('/author-profile')
        toast.success('Author Logined successfully')
      }
      else if(currentUser?.role)
      {
        navigate('/admin-profile')
        toast.success('Admin Logined successfully')
      }
    }

  
},[isAuthenticated,currentUser,navigate])

  return (
    <div className={`${pageBackground} flex items-center justify-center py-20`}>
      <div className={formCard}>
        <h2 className={formTitle}>Sign In</h2>

        {/* Error message */}
        {error && <p className={`${errorClass} mb-5`}>{error}</p>}
        {/* Loading */}
        {loading && <p className={loadingClass}>Signing in…</p>}

        <form onSubmit={handleSubmit(onUserLogin)} className="flex flex-col gap-1">

          {/* Role selection */}
          <div className={formGroup}>
            <p className={labelClass}>Select Role</p>
            <div className="flex gap-4 mt-1">
              <label className={`${bodyText} flex items-center gap-2 cursor-pointer`}>
                <input type="radio" {...register('role')} value="user" defaultChecked /> User
              </label>
              <label className={`${bodyText} flex items-center gap-2 cursor-pointer`}>
                <input type="radio" {...register('role')} value="author" /> Author
              </label>
              <label className={`${bodyText} flex items-center gap-2 cursor-pointer`}>
                <input type="radio" {...register('role')} value="admin" /> Admin
              </label>
            </div>
          </div>


          {/* Email */}
          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={inputClass}
            />
          </div>

          <button type="submit" className={submitBtn} disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

       
      </div>
    </div>
  )
}

export default Login