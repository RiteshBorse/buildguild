import { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import {
  addMainInfo,
  getMainInfo,
  addAddress,
  getAddress,
  addContact,
  getContact,
} from "../controllers/administration.controller.js";
const router = Router();


router.post("/main-info/:id", authenticate, addMainInfo);
router.get("/main-info/:id", authenticate, getMainInfo);
router.post("/address/:id", authenticate, addAddress);
router.get("/address/:id", authenticate, getAddress);
router.post("/contact/:id", authenticate, addContact);
router.get("/contact/:id", authenticate, getContact);

export default router;