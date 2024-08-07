// import { Op } from "sequelize";
// import AppError from "../utils/appError";
// import { User } from "../models";
// import { BlogFilter } from "../interfaces";

// export default class BlogService {
//     constructor() {}

//     public cre

//     public getBlogs: Function = async (query: BlogFilter) => {
//         const { limit, offset } = this.paginate(query.page, query.limit);
//         const sk = query.q ? query.q : "";
//         return await Blog.findAll({
//             where: {
//                 blogStatus: "active",
//                 [Op.or]: [
//                     {
//                         title: {
//                             [Op.iLike]: `%${sk}%`,
//                         },
//                     },
//                     {
//                         keywords: {
//                             [Op.iLike]: `%${sk}%`,
//                         },
//                     },
//                 ],
//             },
//             attributes: [
//                 "id",
//                 "title",
//                 "summary",
//                 "image",
//                 "length",
//                 "createdAt",
//             ],
//             include: {
//                 model: User,
//                 as: "author",
//                 required: true,
//                 attributes: ["id", "firstName", "lastName", "profileImage"],
//             },
//             limit,
//             offset,
//         });
//     };

//     public getBlogById: Function = async (id: number) => {
//         this.isPropertyNaN(id, "blog");
//         return await Blog.findOne({
//             where: { id, blogStatus: "active" },
//             attributes: {
//                 exclude: ["blogStatus", "updatedAt", "authorId", "categoryId"],
//             },
//             include: [
//                 {
//                     model: User,
//                     as: "author",
//                     required: true,
//                     attributes: [
//                         "id",
//                         "firstName",
//                         "lastName",
//                         "profileImage",
//                         "bio",
//                     ],
//                 },
//             ],
//         });
//     };

//     public getBlogsByCategoryId: Function = async (
//         id: number,
//         query: BlogFilter
//     ) => {
//         const { limit, offset } = this.paginate(query.page, query.limit);
//         return await Blog.findAll({
//             where: { categoryId: id, blogStatus: "active" },
//             attributes: [
//                 "id",
//                 "title",
//                 "summary",
//                 "image",
//                 "length",
//                 "createdAt",
//             ],
//             include: {
//                 model: User,
//                 as: "author",
//                 required: true,
//                 attributes: ["id", "firstName", "lastName", "profileImage"],
//             },
//             limit,
//             offset,
//         });
//     };

//     private paginate: Function = (
//         clientPage: number = 1,
//         clientLimit: number = 10,
//         maxLimit: number = 100
//     ) => {
//         if (!clientPage) clientPage = 1;
//         if (!clientLimit) clientLimit = 10;
//         let limit = +clientLimit < +maxLimit ? clientLimit : +maxLimit;
//         let offset = (+clientPage - 1) * +limit;
//         return { limit, offset };
//     };

//     private isPropertyNaN: Function = (prop: any, name: string) => {
//         if (isNaN(prop)) throw new AppError(400, `Invalid ${name} id`);
//         return;
//     };
// }
