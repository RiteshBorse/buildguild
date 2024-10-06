import { Router } from "express";
import { uploadFile } from "../utils/cloudinary.js"; 
import { upload } from "../middleware/multer.middleware.js"; 

const router = Router();
router.route('/').post(upload, uploadFile);

export default router;
