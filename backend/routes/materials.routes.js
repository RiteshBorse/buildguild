import { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import {
  addMainInfo,
  getMainInfo,
  addItemInfo,
  getItemInfo,
  addAttachment,
  getAttachment,
  addApprovalhis,
  getApprovalhis
} from "../controllers/materials.controller.js";
const router = Router();

router.post("/main-info/:id", authenticate, addMainInfo);
router.get("/main-info/:id", authenticate, getMainInfo);
router.post("/item-info/:id", authenticate, addItemInfo);
router.get("/item-info/:id", authenticate, getItemInfo);
router.post("/attachment/:id", authenticate, addAttachment);
router.get("/attachment/:id", authenticate, getAttachment);
router.post("/approvalhis/:id", authenticate, addApprovalhis);
router.get("/approvalhis/:id", authenticate, getApprovalhis);


export default router;