import { Router } from "express";
import { checkExisting } from "../middleware/checkExisting.middleware.js";
import { deleteUser, forgotPassword, login, logout, profile, signIn, verifyOtpforForgotPassword, verifyOtpforSignIn, resendOtp } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/authentication.middleware.js";

const router = Router();

router.route("/signin").post(checkExisting , signIn)
router.route("/login").post(checkExisting , login)
router.route("/logout").get(authenticate , logout)
router.route("/signin/verifyOtp").post(checkExisting , verifyOtpforSignIn)
router.route("/forgotpassword").post(checkExisting , forgotPassword)
router.route("/forgotpassword/verifyOtp").post(checkExisting , verifyOtpforForgotPassword)
router.route("/profile").patch(authenticate , profile)
router.route("/delete").post(authenticate , deleteUser)
router.route("/resendOtp").post(checkExisting, resendOtp)

export default router