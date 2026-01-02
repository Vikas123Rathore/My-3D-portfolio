import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project Title Required!"],
  },
  description: {
    type: String,
    required: [true, "Project Description Required!"],
  },
  gitRepoLink: {
    type: String,
    required: [true, "Github Link Required!"],
  },
  projectLink: {
    type: String,
    required: [true, "Project Link Required!"],
  },
  technologies: {
    type: String,
    required: [true, "Tech Stack Required!"], // e.g., "React, Node, Mongo"
  },
  stack: {
    type: String,
    required: [true, "Stack Required!"], // e.g., "MERN Stack"
  },
  deployed: {
    type: String,
    required: [true, "Deployment Status Required!"], // Yes/No
  },
  projectBanner: {
    public_id: { type: String, required: true },
    url: { type: String, required: true }, // Image URL
  },
});

export const Project = mongoose.model("Project", projectSchema);