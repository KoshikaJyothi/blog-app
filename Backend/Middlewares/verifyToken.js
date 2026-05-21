import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = (req,res,next)=>{
 // Try to get token from cookies first, then from Authorization header
 let token = req.cookies.token
 
 if (!token) {
  // Check Authorization header for Bearer token
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7) // Remove 'Bearer ' prefix
  }
 }

 if(!token){
  return res.status(401).json({message:"login required"})
 }

 try{

  const decoded = jwt.verify(token,process.env.JWT_SECRET)

  req.user = decoded

  next()

 }catch(err){
  return res.status(401).json({message:"invalid token"})
 }

}