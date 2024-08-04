import { RequestHandler } from "express";
import ReferenceService from "../services/ReferenceService";
import catchAsync from "../utils/catchAsync";
import { responseFormatter } from "../utils/helpers";
const referenceService = new ReferenceService();

export const getArticleCategories: RequestHandler = catchAsync(
    async (req, res, next) => {
        const data = await referenceService.getArticleCategories(
            req.query,
           
        );
        res.status(200).send(responseFormatter("success", data, "fetch"));
    }
);

export const createArticleCategory: RequestHandler  = catchAsync(async (req, res, next) => {
    const data = await referenceService.createArticleCategory(req.body, req.file!);
    res.status(201).send(responseFormatter("success", data, "create"));
});


export const getArticleCategoryBySlug : RequestHandler = catchAsync(async (req, res, next) => {

    const data = await referenceService.getArticleCategoryBySlug(req.params.slug);
    res.status(200).send(responseFormatter("success", data, "single"));
})


export const updateArticleCategoryBySlug : RequestHandler = catchAsync(async (req, res, next) => {
    const data = await referenceService.updateArticleCategoryBySlug(req.body, req.params.slug, req.file!);
    res.status(200).send(responseFormatter("success", data, "update"));
})


export const deleteArticleCategoryBySlug : RequestHandler = catchAsync(async (req, res, next) => {
    const data = await referenceService.deleteArticleCategory(req.params.slug);
    res.status(200).send(responseFormatter("success", data, "delete"));
})