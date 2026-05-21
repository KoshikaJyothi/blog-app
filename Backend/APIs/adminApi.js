import express from 'express'
import {verifyToken} from '../Middlewares/verifyToken.js'
import UserTypeModel from '../Models/userModel.js'

const adminApp = express.Router()

const checkAdmin = (req,res,next)=>{

 if(req.user.role !== "admin"){
  return res.status(403).json({message:"admin only"})
 }

 next()

}

//block user
adminApp.put('/blockUser',verifyToken,checkAdmin,async(req,res)=>{
 try{
  const user = await UserTypeModel.findByIdAndUpdate(
   req.body.userId,
   {isActive:false},
   {new:true}
  )
  if(!user){
   return res.status(404).json({message:"User not found"})
  }
  res.status(200).json({message:"user blocked",user})
 }catch(err){
  res.status(err.status || 500).json({message:err.message})
 }
})

//unblock user
adminApp.put('/unblockUser',verifyToken,checkAdmin,async(req,res)=>{
 try{
  const user = await UserTypeModel.findByIdAndUpdate(
   req.body.userId,
   {isActive:true},
   {new:true}
  )
  if(!user){
   return res.status(404).json({message:"User not found"})
  }
  res.status(200).json({message:"user unblocked",user})
 }catch(err){
  res.status(err.status || 500).json({message:err.message})
 }
})

export default adminApp