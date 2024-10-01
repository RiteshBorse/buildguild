import { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import {
  getMyProjects,
  createProject,
} from "../controllers/project.controller.js";

const router = Router();

router.route("/myProjects").get(authenticate, getMyProjects);
router.route("/createProject").post(authenticate, createProject);

export default router;
