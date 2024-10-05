import { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import {
  getMyProjects,
  createProject,
  deleteProject
} from "../controllers/project.controller.js";

const router = Router();

router.route("/myProjects").get(authenticate, getMyProjects);
router.route("/createProject").post(authenticate, createProject);
router.route("/deleteProject/:projectId").delete(authenticate, deleteProject);

export default router;
