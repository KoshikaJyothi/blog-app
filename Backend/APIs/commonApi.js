import express from 'express'
import { authenticateUser } from '../services/authService.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import UserTypeModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config()

const commonApp = express.Router()

// Determine cookie security settings based on environment
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // true for HTTPS, false for HTTP
  sameSite: 'lax'
})


commonApp.post('/login',async(req,res)=>{
    try{
        let usercred=req.body;
        if(!usercred.email || !usercred.password){
            return res.status(400).json({message:"Email and password are required"})
        }
        let {token,user}=await authenticateUser(usercred)
        res.cookie("token",token,getCookieOptions())
        res.status(200).json({message:"login success",payload:{...user,token:token}})
    }catch(err){
        res.status(err.status || 500).json({message:err.message || "Login failed"})
    }
})
commonApp.post('/logout',verifyToken,(req,res)=>{
    res.clearCookie('token',getCookieOptions())
    let role =req.user.role
    res.status(200).json({message:"Logout successful",role})
})
//pafe refresh
commonApp.get("/check-auth",verifyToken,(req,res)=>{
res.status(200).json({message:"Authenticated",user:req.user})   

})
//change password
commonApp.post('/changePassword',verifyToken,async(req,res)=>{
    try{
        let {oldPassword,newPassword}=req.body;
        if(!oldPassword || !newPassword){
            return res.status(400).json({message:"Old password and new password are required"})
        }
        let userId=req.user.userId;
        //find user by id
        let user=await UserTypeModel.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        //check old password
        const isMatch=await bcrypt.compare(oldPassword,user.password)
        if(!isMatch){
            return res.status(401).json({message:"Invalid old password"})
        }
        //check if new password is same as old password
        if(oldPassword===newPassword){
            return res.status(400).json({message:"New password cannot be same as old password"})
        }
        //hash new password
        user.password=await bcrypt.hash(newPassword,12)
        await user.save();
        res.status(200).json({message:"Password changed successfully"})
    }catch(err){
        res.status(500).json({message:"Error changing password",error:err.message})
    }
})
export default commonApp