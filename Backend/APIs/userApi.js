import express from 'express';
import { register } from '../services/authService.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import ArticleModel from '../models/ArticleModel.js';
import upload from '../config/Multer.js';
import { uploadToCloudinary } from '../config/CloudinaryUpload.js';
import cloudinary from '../config/Cloudinary.js';

const userApp = express.Router();

/**
 * @route   POST /users
 * @desc    Register a new user with optional profile picture upload
 * @access  Public
 */
userApp.post(
  '/users',
  upload.single('profilePic'),
  async (req, res, next) => {
    let cloudinaryResult;
    try {
      const userObj = req.body;

      // Upload image to Cloudinary if provided
      if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      }

      // Register user
      const newUserObj = await register({
        ...userObj,
        role: 'user',
        profileimgurl: cloudinaryResult?.secure_url,
      });

      return res.status(201).json({
        message: 'User created successfully',
        payload: newUserObj,
      });
    } catch (err) {
      // Rollback Cloudinary upload if needed
      if (cloudinaryResult?.public_id && cloudinary?.uploader?.destroy) {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      }
      return next(err);
    }
  }
);

/**
 * @route   GET /articles
 * @desc    Get all active articles
 * @access  Public
 */
userApp.get('/articles', async (req, res) => {
  try {
    const articles = await ArticleModel.find({ isArticleActive: true })
      .populate('author', 'name email profileimgurl');
    return res.status(200).json({ articles });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /articles/:id/comments
 * @desc    Add a comment to an article
 * @access  Private (requires token)
 */
userApp.post(
  '/articles/:id/comments',
  verifyToken,
  async (req, res) => {
    try {
      const article = await ArticleModel.findById(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      article.comments.push({
        comment: req.body.comment,
        userId: req.user.userId,
      });
      await article.save();
      return res.status(200).json({ message: 'Comment added successfully' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

export default userApp;
