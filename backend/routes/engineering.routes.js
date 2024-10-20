import { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import { addActivity, getActivity, deleteActivity } from "../controllers/Engineering/activity.controller.js";

const router = Router();
router.post("/activity/:id" , authenticate , addActivity);
router.get("/activity/:id" ,authenticate ,  getActivity);
router.post("/activity" ,authenticate ,  deleteActivity);

export default router;