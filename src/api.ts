import { Router } from "express";
import isLoggedIn from "./middlewares/isLoggedIn";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import referenceRoutes from "./routes/referenceRoutes";
import userRoutes from "./routes/userRoutes";
const api = Router();

api.use("/auth", authRoutes)
api.use("/references", isLoggedIn,referenceRoutes)
.use('/users', isLoggedIn, userRoutes);

export default api;
