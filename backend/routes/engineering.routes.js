import { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import { addActivity } from "../controllers/Engineering/activity.controller.js";

const router = Router();
router.post("/activity/:id" , authenticate , addActivity);

export default router;