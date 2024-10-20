import { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import { addActivity, getActivity } from "../controllers/Engineering/activity.controller.js";

const router = Router();
router.post("/activity/:id" , authenticate , addActivity);
router.get("/activity/:id" ,authenticate ,  getActivity)

export default router;