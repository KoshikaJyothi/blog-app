import {Schema,model} from 'mongoose'

const userSchema = new Schema({

 name:{
  type:String,
  required:true
 },

 profileimgurl:{
  type:String,
  default:''
 },

 email:{
  type:String,
  required:true,
  unique:true
 },

 password:{
  type:String,
  required:true
 },

 role:{
  type:String,
  enum:['admin','user','author'],
  required:true
 },

 isActive:{
  type:Boolean,
  default:true
 }

},{
 timestamps:true,
 versionKey:false
})

const UserTypeModel = model("users",userSchema)

export default UserTypeModel