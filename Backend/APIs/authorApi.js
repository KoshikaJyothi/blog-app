import express from 'express'
import {register} from '../Services/authService.js'
import {verifyToken} from '../middlewares/verifyToken.js'
import {checkAuthor} from '../middlewares/checkAuthor.js'
import ArticleModel from '../models/ArticleModel.js'
import UserTypeModel from '../models/userModel.js'
import upload from '../config/Multer.js'
import { uploadToCloudinary } from '../config/CloudinaryUpload.js'
import cloudinary from '../config/Cloudinary.js'

const authorApp = express.Router()

//register author
authorApp.post("/users",upload.single("profilePic"),async (req, res, next) => {
  let cloudinaryResult;
    try {
        let userObj = req.body;
        //  Step 1: upload image to cloudinary from memoryStorage (if exists)
        if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
        }

        // Step 2: call existing register()
        const newUserObj = await register({
        ...userObj,
        role: "author",
        profileimgurl: cloudinaryResult?.secure_url,
        });

        res.status(201).json({
        message: "user created",
        payload: newUserObj,
        });

    } catch (err) {

        // Step 3: rollback 
        if (cloudinaryResult?.public_id) {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
        }

        next(err); // send to your error middleware
    }

  }
  );

//get all articles by logged-in author
authorApp.get('/articles',verifyToken,checkAuthor,async(req,res)=>{
 try{
  const articles = await ArticleModel.find({author:req.user.userId})
   .populate("author","name email profileimgurl")
  res.status(200).json({message:"articles fetched",articles})
 }catch(err){
  res.status(err.status || 500).json({message:err.message})
 }
})

//get single article by author
authorApp.get('/articles/:id',verifyToken,checkAuthor,async(req,res)=>{
 try{
  const article = await ArticleModel.findOne({_id:req.params.id,author:req.user.userId, isArticleActive: true})
   .populate("author","name email profileimgurl")
  if(!article){
   return res.status(404).json({message:"Article not found or unauthorized"})
  }
  res.status(200).json({message:"article fetched",article})
 }catch(err){
  res.status(err.status || 500).json({message:err.message})
 }
})

//create article
authorApp.post('/articles',verifyToken,checkAuthor,async(req,res)=>{
 try{
  console.log('Create article request:', { user: req.user, body: req.body })
  const article = new ArticleModel({
   ...req.body,
   author:req.user.userId
  })
  const created = await article.save()
  console.log('Article created:', created)
  res.status(201).json({message:"article created",created})
 }catch(err){
  console.error('Create article error:', err)
  res.status(err.status || 500).json({message:err.message})
 }
})

//update article
authorApp.put('/articles/:id',verifyToken,checkAuthor,async(req,res)=>{
 try{
  const article = await ArticleModel.findOneAndUpdate(
   {_id:req.params.id,author:req.user.userId, isArticleActive: true},
   {$set:req.body},
   {new:true}
  )
  if(!article){
   return res.status(404).json({message:"Article not found or unauthorized"})
  }
  res.status(200).json({message:"article updated",article})
 }catch(err){
  res.status(err.status || 500).json({message:err.message})
 }
})

//delete article
authorApp.delete('/articles/:id',verifyToken,checkAuthor,async(req,res)=>{
 try{
  const article = await ArticleModel.findOneAndUpdate(
   {_id:req.params.id,author:req.user.userId, isArticleActive: true},
   {$set:{isArticleActive:false}},
   {new:true}
  )
  if(!article){
   return res.status(404).json({message:"Article not found or unauthorized"})
  }
  res.status(200).json({message:"article deleted",article})
 }catch(err){
  res.status(err.status || 500).json({message:err.message})
 }
})

//restore article
authorApp.put('/articles/:id/restore',verifyToken,checkAuthor,async(req,res)=>{
 try{
  const article = await ArticleModel.findOneAndUpdate(
   {_id:req.params.id,author:req.user.userId, isArticleActive: false},
   {$set:{isArticleActive:true}},
   {new:true}
  )
  if(!article){
   return res.status(404).json({message:"Article not found or not deleted or unauthorized"})
  }
  res.status(200).json({message:"article restored",article})
 }catch(err){
  res.status(err.status || 500).json({message:err.message})
 }
})

//get author profile
authorApp.get('/profile',verifyToken,checkAuthor,async(req,res)=>{
 try{
  const user = await UserTypeModel.findById(req.user.userId).select('-password')
  if(!user){
   return res.status(404).json({message:"Author not found"})
  }
  res.status(200).json({message:"profile fetched",user})
 }catch(err){
  res.status(err.status || 500).json({message:err.message})
 }
})

//update author profile
authorApp.put('/profile',verifyToken,checkAuthor,upload.single("profilePic"),async(req,res,next)=>{
 let cloudinaryResult;
 try{
  const user = await UserTypeModel.findById(req.user.userId)
  if(!user){
   return res.status(404).json({message:"Author not found"})
  }

  //upload new profile picture if provided
  if(req.file){
   cloudinaryResult = await uploadToCloudinary(req.file.buffer)
   
   //delete old profile picture from cloudinary
   if(user.profileimgurl){
    const publicId = user.profileimgurl.split('/').pop().split('.')[0]
    await cloudinary.uploader.destroy(`blog-app/${publicId}`)
   }
   
   req.body.profileimgurl = cloudinaryResult.secure_url
  }

  const updatedUser = await UserTypeModel.findByIdAndUpdate(
   req.user.userId,
   {$set:req.body},
   {new:true}
  ).select('-password')
  
  res.status(200).json({message:"profile updated",user:updatedUser})
 }catch(err){
  if(cloudinaryResult?.public_id){
   await cloudinary.uploader.destroy(cloudinaryResult.public_id)
  }
  next(err)
 }
})

//delete author account
authorApp.delete('/profile',verifyToken,checkAuthor,async(req,res)=>{
 try{
  const user = await UserTypeModel.findById(req.user.userId)
  if(!user){
   return res.status(404).json({message:"Author not found"})
  }

  //delete all articles by author
  await ArticleModel.deleteMany({author:req.user.userId})

  //delete profile picture from cloudinary
  if(user.profileimgurl){
   const publicId = user.profileimgurl.split('/').pop().split('.')[0]
   await cloudinary.uploader.destroy(`blog-app/${publicId}`)
  }

  //delete user account
  await UserTypeModel.findByIdAndDelete(req.user.userId)
  
  res.status(200).json({message:"author account deleted successfully"})
 }catch(err){
  res.status(err.status || 500).json({message:err.message})
 }
})

export default authorApp
