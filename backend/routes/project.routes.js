import { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import {
  getMyProjects,
  createProject,
  deleteProject,
  publishProject,
  unPublishProject,
  getProject,
  generateImage 
} from "../controllers/project.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { uploadFile } from "../middleware/cloudinary.middleware.js";

const router = Router();
router.route("/myProjects").get(authenticate, getMyProjects);
router.route("/createProject").post(authenticate , upload , uploadFile, createProject);
router.route("/generateImage").post(authenticate , generateImage);
router.route("/deleteProject/:projectId").delete(authenticate, deleteProject);
router.route("/publish/:id").get(authenticate , publishProject);
router.route("/unPublish/:id").get(authenticate , unPublishProject);
router.route("/getProject/:id").get(authenticate , getProject)
export default router;
