import { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import {
  addMainInfo,
  getMainInfo,
  addAddress,
  getAddress,
  addContact,
  getContact,
  addExtraInfo,
  getExtraInfo,
  addAttachment,
  getAttachment
} from "../controllers/administration.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { uploadFile } from "../middleware/cloudinary.middleware.js";
const router = Router();


router.post("/main-info/:id", authenticate, addMainInfo);
router.get("/main-info/:id", authenticate, getMainInfo);
router.post("/address/:id", authenticate, addAddress);
router.get("/address/:id", authenticate, getAddress);
router.post("/contact/:id", authenticate, addContact);
router.get("/contact/:id", authenticate, getContact);
router.post("/extra-info/:id",authenticate, addExtraInfo);
router.get("/extra-info/:id", authenticate, getExtraInfo);
router.post("/attachment/:id",authenticate,upload, uploadFile,addAttachment);
router.get("/attachment/:id", authenticate, getAttachment);


export default router;