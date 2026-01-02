import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectSchema.js";
import cloudinary from "cloudinary";

// 1. ADD NEW PROJECT (Ye wala code Project Title check karega, Software Name nahi)
export const addNewProject = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Banner Image Required!", 400));
  }
  const { projectBanner } = req.files;
  const { title, description, gitRepoLink, projectLink, technologies, stack, deployed } = req.body;

  // 👇 Yahan hum Title check kar rahe hain
  if (!title || !description || !gitRepoLink || !projectLink || !technologies || !stack || !deployed) {
    return next(new ErrorHandler("Please Provide All Project Details!", 400));
  }

  const cloudinaryResponse = await cloudinary.v2.uploader.upload(
    projectBanner.tempFilePath,
    { folder: "PORTFOLIO_PROJECTS" }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(new ErrorHandler("Failed to upload to Cloudinary", 500));
  }

  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New Project Added Successfully!",
    project,
  });
});

// 2. UPDATE PROJECT
export const updateProject = catchAsyncErrors(async (req, res, next) => {
  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    gitRepoLink: req.body.gitRepoLink,
    projectLink: req.body.projectLink,
    technologies: req.body.technologies,
    stack: req.body.stack,
    deployed: req.body.deployed,
  };

  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(req.params.id);
    const projectImageId = project.projectBanner.public_id;
    await cloudinary.v2.uploader.destroy(projectImageId);
    const newProjectBanner = await cloudinary.v2.uploader.upload(
      projectBanner.tempFilePath,
      { folder: "PORTFOLIO_PROJECTS" }
    );
    newProjectData.projectBanner = {
      public_id: newProjectBanner.public_id,
      url: newProjectBanner.secure_url,
    };
  }

  const project = await Project.findByIdAndUpdate(req.params.id, newProjectData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Project Updated!",
    project,
  });
});

// 3. DELETE PROJECT
export const deleteProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project not found!", 404));
  }
  await cloudinary.v2.uploader.destroy(project.projectBanner.public_id);
  await project.deleteOne();
  res.status(200).json({
    success: true,
    message: "Project Deleted!",
  });
});

// 4. GET ALL PROJECTS
export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    projects,
  });
});

// 5. GET SINGLE PROJECT
export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project not found!", 404));
  }
  res.status(200).json({
    success: true,
    project,
  });
});