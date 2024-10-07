import { asyncHandler } from "../utils/asyncHandler.js";
import { Router } from "express";
import { Project } from "../models/Project/project.model.js";
import { User } from "../models/User/user.model.js";
import { projectCreationUtility } from "../utils/projectCreation.js";

const router = Router();

const getMyProjects = asyncHandler(async (req, res) => {

   // const userId = req.user._id;
    const {user}= req;
  const projects = await Project.find({ creator: user._id });
  if (!projects.length) {
    return res.status(404).send({ message: "No Projects", success: false });
  }
  res
    .status(200)
    .send({ message: "Projects Fetched", success: true, projects });
});

const createProject = asyncHandler(async (req, res) => {
  const { name, location } = req.body;
  const { imageUrl } = req;
  if (!name || !location) {
    return res
      .status(400)
      .send({ message: "All fields are required", success: false });
  }
  const newProject = ({
    name,
    location,
    displayImage : imageUrl,
    creator: req.user._id,
  });
 
  const projectId = await projectCreationUtility(newProject);
  const user = await User.findById(req.user._id);
  user.projects.push(projectId);
  await user.save();

  res.status(200).send({
    message: "Project Created Successfully",
    success: true,
    project: newProject,
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params; // Extract projectId from request parameters
  const userId = req.user._id; // Get the authenticated user's ID

  const project = await Project.findById(projectId); // Find the project

  if (!project) {
    return res.status(404).json({ message: "Project not found", success: false });
  }

  if (project.creator.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Unauthorized", success: false });
  }

  await Project.findByIdAndDelete(projectId); // Delete the project
  res.status(200).json({ message: "Project Deleted Successfully", success: true });
});


export { getMyProjects, createProject, deleteProject };

export default router;
