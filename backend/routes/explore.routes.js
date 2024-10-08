import { Router } from "express";
import { getPublishedProjects, getPublishedProjectsDetail } from "../controllers/explore.controller.js";

const router = Router();

router.route('/').get(getPublishedProjects)
router.route('/:id').get(getPublishedProjectsDetail)

export default router