import { RequestHandler } from "express";
import ReferenceService from "../services/referenceService";
import catchAsync from "../utils/catchAsync";
import { responseFormatter } from "../utils/helpers";
const referenceService = new ReferenceService();

// Start of Article Tag Controller
export const getArticleCategories: RequestHandler = catchAsync(
    async (req, res, next) => {
        const data = await referenceService.getArticleCategories(req.query);
        res.status(200).send(responseFormatter("success", data, "fetch"));
    }
);

export const createArticleCategory: RequestHandler = catchAsync(
    async (req, res, next) => {
        const data = await referenceService.createArticleCategory(
            req.body,
            req.file!
        );
        res.status(201).send(responseFormatter("success", data, "create"));
    }
);

export const getArticleCategoryBySlug: RequestHandler = catchAsync(
    async (req, res, next) => {
        const data = await referenceService.getArticleCategoryBySlug(
            req.params.slug
        );
        res.status(200).send(responseFormatter("success", data, "single"));
    }
);

export const updateArticleCategoryBySlug: RequestHandler = catchAsync(
    async (req, res, next) => {
        const data = await referenceService.updateArticleCategoryBySlug(
            req.body,
            req.params.slug,
            req.file!
        );
        res.status(200).send(responseFormatter("success", data, "update"));
    }
);

export const deleteArticleCategoryBySlug: RequestHandler = catchAsync(
    async (req, res, next) => {
        const data = await referenceService.deleteArticleCategory(
            req.params.slug
        );
        res.status(200).send(responseFormatter("success", data, "delete"));
    }
);

// End of Article Tag Controller

// Start of Article Tag Controller
export const getArticleTags: RequestHandler = catchAsync(
    async (req, res, next) => {
        const data = await referenceService.getArticleTags(req.query);
        res.status(200).send(responseFormatter("success", data, "fetch"));
    }
);

export const createArticleTag: RequestHandler = catchAsync(
    async (req, res, next) => {
        const data = await referenceService.createArticleTag(
            req.body,
            req.file!
        );
        res.status(201).send(responseFormatter("success", data, "create"));
    }
);

export const getArticleTagBySlug: RequestHandler = catchAsync(
    async (req, res, next) => {
        const data = await referenceService.getArticleTagBySlug(
            req.params.slug
        );
        res.status(200).send(responseFormatter("success", data, "single"));
    }
);

export const updateArticleTagBySlug: RequestHandler = catchAsync(
    async (req, res, next) => {
        const data = await referenceService.updateArticleTagBySlug(
            req.body,
            req.params.slug,
            req.file!
        );
        res.status(200).send(responseFormatter("success", data, "update"));
    }
);

export const deleteArticleTagBySlug: RequestHandler = catchAsync(
    async (req, res, next) => {
        const data = await referenceService.deleteArticleTag(req.params.slug);
        res.status(200).send(responseFormatter("success", data, "delete"));
    }
);

// End of Article Tag Controller
