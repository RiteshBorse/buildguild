import { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { uploadFile } from "../middleware/cloudinary.middleware.js";
import {
  addMainInfo,
  getMainInfo,
  addItemInfo,
  getItemInfo,
  addAttachment,
  getAttachment,
  addApprovalHistory,
  getApprovalHistory,
  addBillingTerm,
  getBillingTerm,
  getChangeHistory
} from "../controllers/materials.controller.js";
const router = Router();

router.post("/main-info/:id", authenticate, addMainInfo);
router.get("/main-info/:id", authenticate, getMainInfo);
router.post("/item-info/:id", authenticate, addItemInfo);
router.get("/item-info/:id", authenticate, getItemInfo);
//router.post("/attachment/:id", authenticate, upload, uploadFile, addAttachment);
router.post("/attachment/:id", authenticate,addAttachment);
router.get("/attachment/:id", authenticate, getAttachment);
router.post("/approvalhis/:id", authenticate, addApprovalHistory);
router.get("/approvalhis/:id", authenticate, getApprovalHistory);
router.post("/billingterm/:id", authenticate, addBillingTerm);
router.get("/billingterm/:id", authenticate, getBillingTerm);
router.get("/changehis/:id", authenticate, getChangeHistory);


export default router;
