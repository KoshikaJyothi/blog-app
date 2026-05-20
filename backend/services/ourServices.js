import UserTypeModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import { config } from "dotenv"
import jwt from 'jsonwebtoken'
config()

export const register=async(userObj)=>{
    //create user
    let user=new UserTypeModel(userObj)
    await user.validate();
    user.password=await bcrypt.hash(user.password,12)
    const created=await user.save();
    const newUserObj=created.toObject();
    delete newUserObj.password;
    return newUserObj;
}

export const authenticate= async({email,password})=>{
    const user=await UserTypeModel.findOne({email})
    //user active state
    if(!user){
        const err=new Error("Invalid email")
        err.status=401;
        throw err;
    }
    if(!user.isActive){
        const err=new Error("User is blocked, contact admin")
        err.status=403;
        throw err;
    }
    // check password 
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        const err=new Error("invalid password")
        err.status=401
        throw err;
    }
    //generate token
    const token=jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_SECRET,
      { expiresIn: "1d" })
      return {token,user:user.toObject()}
}
