import { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import {
    addReceipt,
    getReceipt,
    addMainInfo,
    getMainInfo,
    addApprovalHistory,
    getApprovalHistory,
    addDailyWages,
    getDailyWages,
    addAttachment,
    getAttachment,
    getChangeHistory,
    approveItem,
    deleteAttachment,
    deleteMainInfo,
    editMainInfo,
    getOneMainInfo,
} from "../controllers/financial.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { uploadFile } from "../middleware/cloudinary.middleware.js";
const router = Router();


router.post("/main-info/:id", authenticate, addMainInfo);
router.post("/main-info", authenticate, deleteMainInfo);
router.get("/main-info/:id", authenticate, getMainInfo);
router.patch("/main-info", authenticate, editMainInfo);
router.get("/main-info", authenticate, getOneMainInfo);
router.post("/receipt/:id", authenticate, addReceipt);
router.get("/receipt/:id", authenticate, getReceipt);
router.post("/approval-history/:id", authenticate, addApprovalHistory);
router.get("/approval-history/:id", authenticate, getApprovalHistory);
router.post("/daily-wages/:id", authenticate,addDailyWages);
router.get("/daily-wages/:id", authenticate, getDailyWages);
router.post("/attachment/:id",authenticate,upload, uploadFile,addAttachment);
router.get("/attachment/:id", authenticate, getAttachment);
router.post("/attachment", authenticate, deleteAttachment);
router.get("/change-history/:id", authenticate, getChangeHistory);
router.post("/approveitem", authenticate, approveItem);





export default router;