import { Router } from "express";
import {
    getUsers,
    getUserById,
    updateUserById,
    createUser,
    deleteUserById,
} from "../controllers/userControllers";
import authorizeOnly from "../middlewares/athorizeOnly";
import uploadSingleFile from "../middlewares/uploadSingleFile";
import resizeSignleImage from "../middlewares/resizeSingleImage";
const router = Router();

router
    .get("/", authorizeOnly("Admin"), getUsers)
    .post(
        "/",
        authorizeOnly("Admin"),
        uploadSingleFile("profileImage","disk", "users"),
        resizeSignleImage(0,0,100),
        createUser
    )
    .get("/:id", getUserById)
    .patch(
        "/:id",
        authorizeOnly("Admin"),
        uploadSingleFile("profileImage","disk", "users"),
        resizeSignleImage(0,0,100),
        updateUserById
    )
    .delete("/:id", authorizeOnly("Admin"), deleteUserById);

// user's profile and security
// .post("/",
//     uploadSingleFile("profileImage", "memory"),
//     resizeSignleImage("profileImage", process.env.PROFILE_IMAGES_DIR, 200, 200),
//     updateProfile)
// .patch("/", updatePassword)

// // user's blog posts
// .get("/blogs", authorizeOnly("author", "admin"), getUserBlogs)
// .get("/blogs/:id", authorizeOnly("author", "admin"), getUserBlogById)
// .post("/blogs",
//     authorizeOnly("author", "admin"),
//     uploadSingleFile("blogImage", "memory"),
//     resizeSignleImage("blogImage", process.env.BLOG_IMAGES_DIR, 400, 400),
//     createBlog)
// .patch("/blogs/:id",
//     authorizeOnly("author", "admin"),
//     uploadSingleFile("blogImage", "memory"),
//     resizeSignleImage("blogImage", process.env.BLOG_IMAGES_DIR, 400, 400),
//     updateBlog)
// .delete("/blogs/:id", authorizeOnly("author", "admin"), deleteBlog)

// // user's reviews
// .get("/reviews/:id", clapBlog)
// .post("/reviews", createReview)
// .patch("/reviews/:id", updateReview)

export default router;
