import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

 username:{
  type:String,
  required:true,
  unique:true,
  trim:true,
  minlength:3,
  maxlength:30
 },

 email:{
  type:String,
  required:true,
  unique:true,
  lowercase:true
 },

 password:{
  type:String,
  required:true
 },

 bio:{
  type:String,
  maxlength:300,
  default:""
 },

 profileImage:{
  type:String,
  default:""
 },

 likedPosts:[
 {
  type:mongoose.Schema.Types.ObjectId,
  ref:"Post"
 }
 ]

},
{
 timestamps:true
});

export default mongoose.models.User ||
mongoose.model("User",UserSchema);