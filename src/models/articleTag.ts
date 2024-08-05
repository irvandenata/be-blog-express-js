import { DataTypes, Op } from "sequelize";
import { ArticleTagModel } from "../interfaces";
import db from "./connection";
import { deleteFileIfExists, generateUrlImage } from "../utils/helpers";

const ArticleTag = db.define<ArticleTagModel>(
    "articleTag",
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
        slug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);

ArticleTag.beforeCreate(async (articleTag) => {
    // check slug not used

    let slug: string = articleTag.name.split(" ").join("-");
    await db.models.articleTag
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
    articleTag.slug = slug;
});

ArticleTag.beforeUpdate(async (articleTag) => {
    // check slug not used
    let slug: string = articleTag.name.split(" ").join("-");
    await db.models.articleTag
        .findOne({
            where: {
                slug: slug,
                id: { [Op.ne]: articleTag.id },
            },
        })
        .then((result) => {
            if (result) {
                slug = slug + "-" + Math.floor(Math.random() * 1000);
            }
        });
    articleTag.slug = slug;
});

export default ArticleTag;
