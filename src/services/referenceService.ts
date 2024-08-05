import { Op } from "sequelize";
import AppError from "../utils/appError";
import { ReferenceFilter, File, ArticleCategoryModel } from "../interfaces";
import ArticleCategory from "../models/articleCategory";
import fs from "fs";
import { generateUrlImage } from "../utils/helpers";
export default class ReferenceService {
    constructor() {}

    /**
     * @function getArticleCategories
     * @summary Retrieves a list of article categories
     * @param {ReferenceFilter} query - The query parameters for filtering the article categories
     * @return {ArticleCategory[]} - An array of article category objects
     */
    public getArticleCategories: Function = async (query: ReferenceFilter) => {
        const { limit, offset } = this.paginate(query.page, query.limit);
        const sk = query.q ? query.q : "";
        const result = await ArticleCategory.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${sk}%`,
                        },
                    },
                ],
            },
            limit,
            offset,
        });
        const totalData = await ArticleCategory.count({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${sk}%`,
                        },
                    },
                ],
            },
        });

        return {
            rows: result,
            page: offset / limit + 1,
            limit: limit,
            count: totalData,
            totalData: totalData,
            totalPages: Math.ceil(totalData / (query.limit || 10)),
        };
    };

    /**
     * @function createArticleCategory
     * @summary Creates a new article category
     * @param {ArticleCategoryData} data - The data for creating a new article category
     * @return {ArticleCategory} - The newly created article category object
     */
    public createArticleCategory: Function = async (
        data: ArticleCategoryModel,
        file?: File
    ) => {
        let image: string = "";
        if (file) {
            image = file.path!.replace(`${process.env.STORAGE_PATH}/`, "");
        }
        return await ArticleCategory.create(
            { ...data, image: image },
            {
                returning: true,
            }
        );
    };

    public getArticleCategoryBySlug: Function = async (slug: string) => {
        return await ArticleCategory.findOne({
            where: { slug },
        }).then((result) => {
            if (!result) {
                throw new AppError(404, "Article category not found");
            }
            result.image = generateUrlImage(result.image);
            return result;
        });
    };

    public updateArticleCategoryBySlug: Function = async (
        data: ArticleCategoryModel,
        slug: string,
        file?: File
    ) => {
        let image: string = "";
        if (file) {
            image = file.path!.replace(`${process.env.STORAGE_PATH}/`, "");
        }
        return await ArticleCategory.update(
            { ...data, image: image },
            {
                where: { slug },
                returning: true,
                individualHooks: true,
            }
        ).then(([rows, [result]]) => {
            if (!result) {
                throw new AppError(404, "Article category not found");
            }
            return result;
        });
    };



    public deleteArticleCategory = async (slug: string) => {
        const result = await ArticleCategory.destroy({
            where: { slug },
            individualHooks: true,
        });
        if (!result) {
            throw new AppError(404, "Article category not found");
        }
        return { message: "Article category deleted successfully" };
    };

    // public getBlogs: Function = async (query: BlogFilter) => {
    //     const { limit, offset } = this.paginate(query.page, query.limit);
    //     const sk = query.q ? query.q : "";
    //     return await Blog.findAll({
    //         where: {
    //             blogStatus: "active",
    //             [Op.or]: [
    //                 {
    //                     title: {
    //                         [Op.iLike]: `%${sk}%`,
    //                     },
    //                 },
    //                 {
    //                     keywords: {
    //                         [Op.iLike]: `%${sk}%`,
    //                     },
    //                 },
    //             ],
    //         },
    //         attributes: [
    //             "id",
    //             "title",
    //             "summary",
    //             "image",
    //             "length",
    //             "createdAt",
    //         ],
    //         include: {
    //             model: User,
    //             as: "author",
    //             required: true,
    //             attributes: ["id", "firstName", "lastName", "profileImage"],
    //         },
    //         limit,
    //         offset,
    //     });
    // };

    // public getBlogById: Function = async (id: number) => {
    //     this.isPropertyNaN(id, "blog");
    //     return await Blog.findOne({
    //         where: { id, blogStatus: "active" },
    //         attributes: {
    //             exclude: ["blogStatus", "updatedAt", "authorId", "categoryId"],
    //         },
    //         include: [
    //             {
    //                 model: User,
    //                 as: "author",
    //                 required: true,
    //                 attributes: [
    //                     "id",
    //                     "firstName",
    //                     "lastName",
    //                     "profileImage",
    //                     "bio",
    //                 ],
    //             },
    //         ],
    //     });
    // };

    // public getBlogsByCategoryId: Function = async (
    //     id: number,
    //     query: BlogFilter
    // ) => {
    //     const { limit, offset } = this.paginate(query.page, query.limit);
    //     return await Blog.findAll({
    //         where: { categoryId: id, blogStatus: "active" },
    //         attributes: [
    //             "id",
    //             "title",
    //             "summary",
    //             "image",
    //             "length",
    //             "createdAt",
    //         ],
    //         include: {
    //             model: User,
    //             as: "author",
    //             required: true,
    //             attributes: ["id", "firstName", "lastName", "profileImage"],
    //         },
    //         limit,
    //         offset,
    //     });
    // };

    private paginate: Function = (
        clientPage: number = 1,
        clientLimit: number = 10,
        maxLimit: number = 100
    ) => {
        if (!clientPage) clientPage = 1;
        if (!clientLimit) clientLimit = 10;
        let limit = +clientLimit < +maxLimit ? clientLimit : +maxLimit;
        let offset = (+clientPage - 1) * +limit;
        return { limit, offset };
    };

    private isPropertyNaN: Function = (prop: any, name: string) => {
        if (isNaN(prop)) throw new AppError(400, `Invalid ${name} id`);
        return;
    };
}
