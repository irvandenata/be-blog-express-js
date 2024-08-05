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
import checkExistFindData from "../middlewares/checkExistFindData";
import ArticleCategory from "../models/articleCategory";
const router = Router();

router
    .get("/article-categories", authorizeOnly("Admin"), getArticleCategories)
    .post(
        "/article-categories",
        authorizeOnly("Admin"),
        uploadSingleFile("image", "disk", "article-category"),
        resizeSignleImage(0, 0, 100),
        createArticleCategory
    )
    .get(
        "/article-categories/:slug",
        checkExistFindData(ArticleCategory, "slug"),
        authorizeOnly("Admin"),
        getArticleCategoryBySlug
    )
    .patch(
        "/article-categories/:slug",
        authorizeOnly("Admin"),
        checkExistFindData(ArticleCategory, "slug"),
        uploadSingleFile("image", "disk", "article-category"),
        resizeSignleImage(0, 0, 100),
        updateArticleCategoryBySlug
    )
    .delete("/article-categories/:slug", authorizeOnly("Admin"), deleteArticleCategoryBySlug);

export default router;
