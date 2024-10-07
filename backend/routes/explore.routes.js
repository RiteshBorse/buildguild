import { Router } from "express";
import { getPublishedProjects } from "../controllers/explore.controller.js";

const router = Router();

router.route('/').get(getPublishedProjects)

export default router