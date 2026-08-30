import { Router } from "express";
import { userRegister, userLogin, userLogOut, refreshAccessToken, userChangePassword, userViewProfile, getCurrentUser, forgetPassword, resetPassword } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.none(), userRegister)
router.route("/login").post(userLogin)
router.route("/logout").post(verifyJwt, upload.none(), userLogOut)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/changepassword").post(verifyJwt, upload.none(), userChangePassword)
router.route("/forgetpasword").post(upload.none(), forgetPassword)
router.route("/reset-password/:token").post(upload.none(), resetPassword)
router.route("/profile").post(verifyJwt, userViewProfile)
router.route("/me").get(verifyJwt, getCurrentUser)


export default router;  