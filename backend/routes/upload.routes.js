import { Router } from "express";
import { uploadFile } from "../controllers/upload.controller.js"; 
import { upload } from "../middleware/upload.middleware.js"; 

const router = Router();
router.route('/upload').post(upload,uploadFile);


export default router;
