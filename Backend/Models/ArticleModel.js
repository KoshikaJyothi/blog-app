import {Schema,model} from 'mongoose'

const commentSchema = new Schema({

 userId:{
  type:Schema.Types.ObjectId,
  ref:"users"
 },

 comment:{
  type:String,
  required:true
 }

})

const articleSchema = new Schema({

 author:{
  type:Schema.Types.ObjectId,
  ref:"users",
  required:true
 },

 title:{
  type:String,
  required:true
 },

 category:{
  type:String,
  required:true
 },

 content:{
  type:String,
  required:true
 },

 comments:[commentSchema],

 isArticleActive:{
  type:Boolean,
  default:true
 }

},{
 timestamps:true,
 versionKey:false
})

const ArticleModel = model("articles",articleSchema)

export default ArticleModel