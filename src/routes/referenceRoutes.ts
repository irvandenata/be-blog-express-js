import { Router } from "express";
import {
    createArticleCategory,
    createArticleTag,
    deleteArticleCategoryBySlug,
    deleteArticleTagBySlug,
    getArticleCategories,
    getArticleCategoryBySlug,
    getArticleTagBySlug,
    getArticleTags,
    updateArticleCategoryBySlug,
    updateArticleTagBySlug,
} from "../controllers/referenceControllers";
import authorizeOnly from "../middlewares/athorizeOnly";
import uploadSingleFile from "../middlewares/uploadSingleFile";
import resizeSignleImage from "../middlewares/resizeSingleImage";
import checkExistFindData from "../middlewares/checkExistFindData";
import ArticleCategory from "../models/articleCategory";
import ArticleTag from "../models/articleTag";
const router = Router();

router

    // Start of Article Tag
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
    .delete(
        "/article-categories/:slug",
        authorizeOnly("Admin"),
        checkExistFindData(ArticleCategory, "slug"),
        deleteArticleCategoryBySlug
    )
    // End of Article Tag
    .get("/article-tags", authorizeOnly("Admin"), getArticleTags)
    .post("/article-tags", authorizeOnly("Admin"), createArticleTag)
    .get(
        "/article-tags/:slug",
        checkExistFindData(ArticleTag, "slug"),
        getArticleTagBySlug
    )
    .patch(
        "/article-tags/:slug",
        authorizeOnly("Admin"),
        checkExistFindData(ArticleTag, "slug"),
        resizeSignleImage(0, 0, 100),
        updateArticleTagBySlug
    )
    .delete(
        "/article-tags/:slug",
        authorizeOnly("Admin"),
        checkExistFindData(ArticleTag, "slug"),
        deleteArticleTagBySlug
    );

export default router;
