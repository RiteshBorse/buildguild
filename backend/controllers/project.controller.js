import { asyncHandler } from "../utils/asyncHandler.js";
import { Router } from "express";
import Project from "../models/project.model.js";

const router = Router();

const getMyProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).send({ message: "ok", success: true});
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
});

const createProject = asyncHandler(async (req, res) => {
  const { name, location, imageUrl } = req.body;

  const newProject = new Project({ name, location, image}); 

  try {
    const savedProject = await newProject.save();
    res.status(200).send({ message: "ok", success: true});
  } catch (err) {
    res.status(400).send({ message: err.message, success: false });
  }
});

export { getMyProjects, createProject };

export default router;
