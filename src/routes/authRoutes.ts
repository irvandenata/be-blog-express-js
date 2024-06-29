import { Router } from "express";
import { register} from "../controllers/authControllers";
const router = Router();

router
    .post("/register", register)
    // .get("/verify/:token", verify)
    // .post("/login", login)
    // .get("/check-auth", checkAuth)
    // .get("/logout", logout)

export default router;
