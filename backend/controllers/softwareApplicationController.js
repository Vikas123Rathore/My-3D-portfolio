import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { SoftwareApplication } from "../models/softwareApplicationSchema.js";
import cloudinary from "cloudinary";

// 1. ADD NEW SKILL
export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Software Application Icon/Image Required!", 400));
  }
  const { svg } = req.files;
  const { name } = req.body;

  if (!name) {
    return next(new ErrorHandler("Software Name Required!", 400));
  }

  const cloudinaryResponse = await cloudinary.v2.uploader.upload(
    svg.tempFilePath,
    { folder: "PORTFOLIO_SKILLS" }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(new ErrorHandler("Failed to upload to Cloudinary", 500));
  }

  const softwareApplication = await SoftwareApplication.create({
    name,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Skill Added!",
    softwareApplication,
  });
});

// 2. DELETE SKILL
export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const softwareApplication = await SoftwareApplication.findById(id);
  if (!softwareApplication) {
    return next(new ErrorHandler("Skill not found!", 404));
  }
  const softwareApplicationImageId = softwareApplication.svg.public_id;
  await cloudinary.v2.uploader.destroy(softwareApplicationImageId);
  await softwareApplication.deleteOne();

  res.status(200).json({
    success: true,
    message: "Skill Deleted!",
  });
});

// 3. GET ALL SKILLS
export const getAllApplications = catchAsyncErrors(async (req, res, next) => {
  const softwareApplications = await SoftwareApplication.find();
  res.status(200).json({
    success: true,
    softwareApplications,
  });
});

// 4. UPDATE SKILL (New Function Added)
export const updateApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let softwareApplication = await SoftwareApplication.findById(id);
  if (!softwareApplication) {
    return next(new ErrorHandler("Skill not found!", 404));
  }

  // Agar nayi Image/Icon aayi hai to purani delete karke update karo
  if (req.files && req.files.svg) {
    const svg = req.files.svg;
    const softwareApplicationImageId = softwareApplication.svg.public_id;
    await cloudinary.v2.uploader.destroy(softwareApplicationImageId);
    
    const newCloudinaryResponse = await cloudinary.v2.uploader.upload(
        svg.tempFilePath,
        { folder: "PORTFOLIO_SKILLS" }
    );
    
    softwareApplication.svg = {
      public_id: newCloudinaryResponse.public_id,
      url: newCloudinaryResponse.secure_url,
    };
  }

  // Name Update
  if(req.body.name) {
      softwareApplication.name = req.body.name;
  }

  await softwareApplication.save();

  res.status(200).json({
    success: true,
    message: "Skill Updated Successfully!",
    softwareApplication,
  });
});