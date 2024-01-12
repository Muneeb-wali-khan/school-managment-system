import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "username must be unique"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "password is required !!"],
    },

    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
    },
    uniqueCode:{
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// hash password and uniqueCode  before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password", "uniqueCode")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.uniqueCode = await bcrypt.hash(this.uniqueCode, 10);
  next();
});



//  compare password function
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}


// gen  access token  function
userSchema.methods.generateAccessToken =  function(){
    return jwt.sign({
      _id: this._id,
      email: this.email,
      username: this.username,
      first_name:  this.first_name,
      last_name: this.last_name,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    }
    
    )
}


// gen refresh token  function
userSchema.methods.generateRefreshToken =  function(){
    return jwt.sign({
      _id: this._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    }
    
    )
}



export const User = mongoose.model("User", userSchema);
