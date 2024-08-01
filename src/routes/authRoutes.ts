import { Router } from "express";
import {
    register,
    login,
    checkAuth,
    logout,
    verify,
     sendForgotPasswordMail,
     forgotPassword
} from "../controllers/authControllers";
const router = Router();
router
    .post("/register", register)
    .post("/send-forgot-password-mail", sendForgotPasswordMail)
    .post("/forgot-password", forgotPassword)
    .get("/verify/:token", verify)
    .post("/login", login)
    .get("/check-auth", checkAuth)
    .get("/logout", logout);

export default router;
