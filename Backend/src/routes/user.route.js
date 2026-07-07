import { Router } from "express";
import { userRegister, userLogin, userLogOut, refreshAccessToken, userChangePassword, updateUserProfileImage, userViewProfile } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import verifyJwt from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.fields([{ name: "profileImage", maxCount: 1 }]), userRegister)
router.route("/login").post(upload.none(), userLogin)
router.route("/logout").post(verifyJwt, upload.none(), userLogOut)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/changepassword").post(verifyJwt, upload.none(), userChangePassword)
// router.route("/forgetpasword").post(verifyJwt, upload.none(), forgetPassword)
router.route("/changeimage").post(verifyJwt, upload.fields([{ name: "profileImage", maxCount: 1 }]), updateUserProfileImage)
router.route("/profile").post(verifyJwt, userViewProfile)


export default router;  