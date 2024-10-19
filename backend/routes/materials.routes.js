import { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { uploadFile } from "../middleware/cloudinary.middleware.js";
import {
  addMainInfo,
  getMainInfo,
  deleteMainInfo,
  addItemInfo,
  getItemInfo,
  deleteItemInfo,
  addAttachment,
  getAttachment,
  deleteAttachment,
  addApprovalHistory,
  getApprovalHistory,
  approveItem,
  addBillingTerm,
  getBillingTerm,
  deleteBillingTerm,
  getChangeHistory
} from "../controllers/materials.controller.js";
const router = Router();

//Main Info 
router.post("/main-info/:id", authenticate, addMainInfo);
router.get("/main-info/:id", authenticate, getMainInfo);
router.post("/main-info",authenticate, deleteMainInfo);
//Item Info
router.post("/item-info/:id", authenticate, addItemInfo);
router.get("/item-info/:id", authenticate, getItemInfo);
router.post("/item-info",authenticate, deleteItemInfo);
//Attachment
router.post("/attachment/:id", authenticate, upload, uploadFile, addAttachment);
router.get("/attachment/:id", authenticate, getAttachment);
router.post("/attachment",authenticate, deleteAttachment);
//Approval History 
router.post("/approvalhis/:id", authenticate, addApprovalHistory);
router.post("/approveitem", authenticate, approveItem);
router.get("/approvalhis/:id", authenticate, getApprovalHistory);
//Billing Term
router.post("/billingterm/:id", authenticate, addBillingTerm);
router.get("/billingterm/:id", authenticate, getBillingTerm);
router.post("/billingterm",authenticate, deleteBillingTerm);
//Change History 
router.get("/changehis/:id", authenticate, getChangeHistory);
export default router;
