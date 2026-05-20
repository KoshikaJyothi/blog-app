import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = (req,res,next)=>{

 const token = req.cookies.token

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