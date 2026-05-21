import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import API_BASE_URL from '../config/api'
import { useNavigate } from 'react-router'
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

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const handleRegister = handleSubmit(async (data) => {
     setLoading(true)
    try {
      if (data.role === 'user') {
        // Create form data object
        const formData = new FormData();
        //get user object
        let { role, profileImageUrl, ...userObj } = data;
        //add all fields except role and profileImageUrl to FormData object
        Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
        });
        // add profileImageUrl to FormData object
        if (profileImageUrl && profileImageUrl[0]) {
          formData.append("profileImageUrl", profileImageUrl[0]);
        }
        let res = await axios.post(`${API_BASE_URL}/user-api/users`, formData)
        if (res.status === 201) {
          navigate('/login')
        }
      }
      if (data.role === 'author') {
        // Send as JSON for author
        let { role, profileImageUrl, ...userObj } = data;
        let res = await axios.post(`${API_BASE_URL}/author-api/users`, userObj)
        if (res.status === 201) {
          setError(null)
          navigate('/login')
        }
      }
    } catch (err) {
      setError(err.response?.data?.message||"failed")
    } finally {
      setLoading(false)
    }
  })
  //cleanup(remove preview image from browser memory)
  useEffect(()=>{
    return ()=>{
      if(preview){
        URL.revokeObjectURL(preview)
      }
    }
  },[preview])
  //loading
  if(loading){
    return <p className={loadingClass}>Registering…</p>
  }
  return (
    <div className={`${pageBackground} flex items-center justify-center py-20`}>
      <div className={formCard}>
        <h2 className={formTitle}>Register</h2>

        {/* Error message */}
        {error && <p className={`${errorClass} mb-5`}>{error}</p>}

        {/* Loading */}
        {loading && <p className={loadingClass}>Registering…</p>}

        <form onSubmit={handleRegister} className="flex flex-col gap-1">

          {/* Role selection */}
          <div className={formGroup}>
            <p className={labelClass}>Select Role</p>
            <div className="flex gap-6 mt-1">
              <label className={`${bodyText} flex items-center gap-2 cursor-pointer`}>
                <input type="radio" {...register('role', { required: 'Please select a role' })} value="user" /> User
        
              </label>
              <label className={`${bodyText} flex items-center gap-2 cursor-pointer`}>
                <input type="radio" {...register('role', { required: 'Please select a role' })} value="author" /> Author
              </label>
            </div>
            {errors.role && <p className={errorClass}>{errors.role.message}</p>}
          </div>

          {/* Name row */}
          <div className="flex gap-3">
            <div className={`${formGroup} flex-1`}>
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                placeholder="First name"
                {...register('firstName', { required: 'First name is required' })}
                className={inputClass}
              />
              {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
            </div>
            <div className={`${formGroup} flex-1`}>
              <label className={labelClass}>Last Name</label>
              <input
                type="text"
                placeholder="Last name"
                {...register('lastName')}
                className={inputClass}
              />
            </div>
          </div>

          {/* Email */}
          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email', { required: 'Email is required' })}
              className={inputClass}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password', { required: 'Password is required' })}
              className={inputClass}
            />
            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
          </div>

          {/* Profile image URL */}
          <div className={formGroup}>
            <label className={labelClass}>Profile Image URL</label>
           <input
            type="file"
            accept="image/png, image/jpeg"
            {...register("profileImageUrl")}
            onChange={(e) => {
              //get image file
              const file = e.target.files[0];
              //validation for image format
              if (file) {
                if (!["image/jpeg", "image/png"].includes(file.type)) {
                  setError("Only JPG or PNG allowed");
                  return;
                }
                //validation for file size
                if (file.size > 2 * 1024 * 1024) {
                  setError("File size must be less than 2MB");
                  return;
                }
                //Converts file → temporary browser URL(create preview URL)
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
                setError(null);
              }
            }}
          />
         {preview && (
                <div className="mt-3 flex justify-center">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                />
                </div>
            )}
          </div>

          <button type="submit" className={submitBtn} disabled={loading}>
            {loading ? 'Registering…' : 'Register'}
          </button>
        </form>

      
      </div>
    </div>
  )
}

export default Register