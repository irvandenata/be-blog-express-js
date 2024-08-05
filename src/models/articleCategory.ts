import { DataTypes, Op } from "sequelize";
import { ArticleCategoryModel } from "../interfaces";
import db from "./connection";
import { deleteFileIfExists, generateUrlImage } from "../utils/helpers";

const ArticleCategory = db.define<ArticleCategoryModel>(
    "articleCategory",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Name is required",
                },
                notEmpty: {
                    msg: "Name cannot be empty",
                },
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);

ArticleCategory.beforeCreate(async (articleCategory) => {
    // check slug not used

    let slug: string = articleCategory.name.split(" ").join("-");
    await db.models.articleCategory
        .findOne({
            where: {
                slug: slug,
            },
        })
        .then((result) => {
            if (result) {
                slug = slug + "-" + Math.floor(Math.random() * 1000);
            }
        });
    articleCategory.slug = slug;
});

ArticleCategory.beforeUpdate(async (articleCategory) => {
    // check slug not used

    if (articleCategory.previous("image") !== articleCategory.image) {
        let oldImage = `${process.env.STORAGE_PATH}/` + articleCategory.previous("image");
        deleteFileIfExists(oldImage);
    }
    let slug: string = articleCategory.name.split(" ").join("-");
    await db.models.articleCategory
        .findOne({
            where: {
                slug: slug,
                id: { [Op.ne]: articleCategory.id },
            },
        })
        .then((result) => {
            if (result) {
                slug = slug + "-" + Math.floor(Math.random() * 1000);
            }
        });
    articleCategory.slug = slug;
});

ArticleCategory.afterUpdate(async (articleCategory) => {
    articleCategory.image = articleCategory.image
        ? generateUrlImage(articleCategory.image)
        : "";
});

ArticleCategory.afterCreate(async (articleCategory) => {
    articleCategory.image = articleCategory.image
        ? generateUrlImage(articleCategory.image)
        : "";
});

ArticleCategory.afterFind((results, options) => {
    if (Array.isArray(results)) {
        results.forEach((result) => {
            (result as ArticleCategoryModel).image = (
                result as ArticleCategoryModel
            )?.image
                ? generateUrlImage((result as ArticleCategoryModel).image)
                : "";
        });
    }
});

ArticleCategory.afterDestroy(async (articleCategory) => {
    if (articleCategory.previous("image")) {
        let oldImage = `${process.env.STORAGE_PATH}/` + articleCategory.previous("image");
        deleteFileIfExists(oldImage);
    }
});

export default ArticleCategory;
