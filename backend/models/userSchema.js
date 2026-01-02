import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name Required!"],
  },
  email: {
    type: String,
    required: [true, "Email Required!"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone Number Required!"],
  },
  aboutMe: {
    type: String,
    required: [true, "About Me Field Required!"],
  },
  password: {
    type: String,
    required: [true, "Password Required!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    select: false, // Security: Password default mein fetch nahi hoga
  },
  avatar: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  resume: {
    public_id: { type: String, required: true },
    url: { type: String, required: true }, // CV Download Link
  },
  portfolioURL: { type: String, required: true },
  
  // Social Links (LinkedIn, Github, Leetcode)
  githubURL: String,
  instagramURL: String,
  linkedinURL: String,
  leetcodeURL: String, 
  twitterURL: String,

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Password Hash karna (Save karne se pehle)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Password Compare Method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Token
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);