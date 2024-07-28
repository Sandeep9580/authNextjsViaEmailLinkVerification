import mongoose from "mongoose";
import { stringify } from "querystring";

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      require: [true, "please provide a username"],
      unique: true
  },
    email: {
      type: String,
      require: [true, "please provide a email"],
      unique: true
  },
    password: {
      type: String,
      require: [true, "please provide a password"],
  },
    isVerify: {
      type: Boolean, 
      default:false,
  },
    isAdmin: {
      type: Boolean, 
      default:false,
  },
   forgotPasswordToken:String,
   forgetPasswordTokenExpiry:Date,
   verifyToken:String,
   verifyTokenExpiry:Date,
});

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User