import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userApp from './APIs/userApi.js'
import adminApp from './APIs/adminApi.js'
import authorApp from './APIs/authorApi.js'
import commonApp from './APIs/commonApi.js'

dotenv.config()

const app = express()

// CORS configuration - Allow both development and production URLs
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://blog-app-kappa-murex.vercel.app/',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

//routes
app.use('/user-api', userApp)
app.use('/admin-api', adminApp)
app.use('/author-api', authorApp)
app.use('/common-api', commonApp)

//invalid path
app.use((req,res)=>{
 res.status(404).json({message:`${req.url} invalid path`})
})

//error middleware
app.use((err,req,res,next)=>{
    // Log the error for debugging purposes
    console.error("An error occurred:", err);
    res.status(err.status || 500).json({message:err.message || "An internal server error occurred."})
})

const connectDB = async()=>{
 try{
  await mongoose.connect(process.env.DB_URL)
  console.log("DB connected")

  app.listen(process.env.PORT,()=>{
   console.log(`Server running on ${process.env.PORT}`)
  })

 }catch(err){
  console.log(err)
 }
}

connectDB()