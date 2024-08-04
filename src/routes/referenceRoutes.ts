import { Router } from "express";
import {
    createArticleCategory,
    deleteArticleCategoryBySlug,
    getArticleCategories,
    getArticleCategoryBySlug,
    updateArticleCategoryBySlug,
} from "../controllers/referenceControllers";
import authorizeOnly from "../middlewares/athorizeOnly";
import uploadSingleFile from "../middlewares/uploadSingleFile";
import resizeSignleImage from "../middlewares/resizeSingleImage";
const router = Router();

router
    .get("/article-categories", authorizeOnly("Admin"), getArticleCategories)
    .post(
        "/article-categories",
        authorizeOnly("Admin"),
        uploadSingleFile("image", "disk", "article-cateogry"),
        resizeSignleImage(0, 0, 100),
        createArticleCategory
    )
    .get(
        "/article-categories/:slug",
        authorizeOnly("Admin"),
        getArticleCategoryBySlug
    )
    .patch(
        "/article-categories/:slug",
        authorizeOnly("Admin"),
        uploadSingleFile("image", "disk", "article-cateogry"),
        resizeSignleImage(0, 0, 100),
        updateArticleCategoryBySlug
    )
    .delete("/article-categories/:slug", authorizeOnly("Admin"), deleteArticleCategoryBySlug);

export default router;
