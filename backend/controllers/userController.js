import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

// 1. REGISTER
export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar and Resume are Required!", 400));
  }
  const { avatar, resume } = req.files;
  const { fullName, email, phone, aboutMe, password, portfolioURL, githubURL, instagramURL, linkedinURL, leetcodeURL, twitterURL } = req.body;

  if (!fullName || !email || !phone || !aboutMe || !password || !portfolioURL || !avatar || !resume) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists!", 400));
  }
  const cloudinaryResponseForAvatar = await cloudinary.v2.uploader.upload(
    avatar.tempFilePath,
    { folder: "PORTFOLIO_AVATARS" }
  );
  if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
    console.error("Cloudinary Error:", cloudinaryResponseForAvatar.error || "Unknown Cloudinary error");
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }
  const cloudinaryResponseForResume = await cloudinary.v2.uploader.upload(
    resume.tempFilePath,
    { folder: "PORTFOLIO_RESUMES" }
  );
  if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
    console.error("Cloudinary Error:", cloudinaryResponseForResume.error || "Unknown Cloudinary error");
    return next(new ErrorHandler("Failed to upload resume to Cloudinary", 500));
  }
  user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    linkedinURL,
    leetcodeURL,
    twitterURL,
    avatar: {
      public_id: cloudinaryResponseForAvatar.public_id,
      url: cloudinaryResponseForAvatar.secure_url,
    },
    resume: {
      public_id: cloudinaryResponseForResume.public_id,
      url: cloudinaryResponseForResume.secure_url,
    },
  });
  generateToken(user, "User Registered Successfully!", 201, res);
});

// 2. LOGIN
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }
  generateToken(user, "Logged In Successfully!", 200, res);
});

// 3. LOGOUT
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    })
    .json({
      success: true,
      message: "Logged Out Successfully!",
    });
});

// 4. GET USER
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: "indrajeetmrj2022@gmail.com" });
  res.status(200).json({
    success: true,
    user,
  });
});

// 5. UPDATE PROFILE
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    portfolioURL: req.body.portfolioURL,
    githubURL: req.body.githubURL,
    linkedinURL: req.body.linkedinURL,
    instagramURL: req.body.instagramURL,
    twitterURL: req.body.twitterURL,
  };

  const user = await User.findOne({ email: "indrajeetmrj2022@gmail.com" });

  // Avatar Update Logic
  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const profileId = user.avatar.public_id;
    if(profileId){
        await cloudinary.v2.uploader.destroy(profileId);
    }
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(
      avatar.tempFilePath,
      { folder: "PORTFOLIO_AVATARS" }
    );
    newUserData.avatar = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  // 👇 RESUME FIX (PUBLIC ACCESS)
  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const resumeId = user.resume.public_id;
    
    // Purana delete
    try {
        if(resumeId){
            await cloudinary.v2.uploader.destroy(resumeId);
        }
    } catch (error) {
        console.log("Delete error ignored:", error);
    }

    // 🚀 MAGIC FIX: 'access_mode: public'
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(
      resume.tempFilePath,
      { 
        folder: "PORTFOLIO_RESUMES",
        resource_type: "auto",  // PDF ko khud detect karne do
        type: "upload",         // Standard upload
        access_mode: "public"   // <--- YE ZAROORI HAI 401 HATANE KE LIYE
      } 
    );

    newUserData.resume = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully!",
    user: updatedUser,
  });
});