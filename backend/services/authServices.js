import UserTypeModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const register = async(userObj)=>{

 const user = new UserTypeModel(userObj)
    let userExists = await UserTypeModel.findOne({email:user.email})

    if(userExists){
        const error = new Error("Email already exists")
        error.status = 400
        throw error
    }
 user.password = await bcrypt.hash(user.password,10)

 const created = await user.save()

 const obj = created.toObject()

 delete obj.password

 return obj
}

export const authenticate = async({email,password})=>{

 const user = await UserTypeModel.findOne({email})

 if(!user){
  const err = new Error("Invalid email")
  err.status = 401
  throw err
 }

 if(!user.isActive){
  const err = new Error("User blocked")
  err.status = 403
  throw err
 }

 const match = await bcrypt.compare(password,user.password)

 if(!match){
  const err = new Error("Invalid password")
  err.status = 401
  throw err
 }

 const token = jwt.sign(
  {userId:user._id,email:user.email,role:user.role},
  process.env.JWT_SECRET,
  {expiresIn:'1d'}
 )

 const userObj = user.toObject();
 delete userObj.password;
 return {token,user:userObj}
}