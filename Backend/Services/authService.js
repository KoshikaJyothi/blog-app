import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../Models/UserModel.js'
import {config} from 'dotenv'
config()

const register = async (userData) => {
   //create document
   const user = new User(userData)
   //validate for emprty passwords
   await user.validate()
   //hash and replace plain password with hash password
   user.password=await bcrypt.hash(user.password,10)
   //save user
   const createdUser=await user.save()
   //convert document to object to remove password
   const userObject=createdUser.toObject()//toObject() is used to convert document to object
   delete userObject.password
   return userObject
}

const authenticateUser= async ({email, password, role}) => {
   //check user with email
   const user=await User.findOne({email});
   if(!user)
   {
    const err=new Error('invalid email');
    err.status=401
    throw err
   }
   //check if the role matches
   if(user.role !== role)
   {
    const err=new Error(`invalid credentials`);
    err.status=401
    throw err
   }
   //check if user is blocked
   if(!user.isActive)
   {
    const err=new Error('user is blocked');
    err.status=403
    throw err
   }
   //compare password
   const isMatch=await bcrypt.compare(password,user.password)
   if(!isMatch)
   {
    const err=new Error('password not match');
    err.status=401
    throw err
   }
   //generate token
   const token =jwt.sign({userId:user._id,role:user.role,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'})
   const userObject=user.toObject()
   delete userObject.password
   return {user:userObject,token}
}

export { register, authenticateUser }