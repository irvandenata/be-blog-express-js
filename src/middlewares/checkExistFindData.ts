import { Model, FindOptions } from "sequelize";
import catchAsync from "../utils/catchAsync";


/**
 * @function checkExistFindData
 * @summary Checks if a data exists in the database
 * @param {Model} model - The model to query
 * @param {string} key - The key to use in the query
 * @return {Function} - The middleware function
 */
const checkExistFindData = (model: any, key: string) => {
    return catchAsync(async (req: any, res: any, next: any) => {
        const data = await model.findOne({
            where: { [key]: req.params[key] },
        });
        if (!data) {
            return res.status(404).json({
                status: "fail",
                message: `${model.name} not found`,
            });
        }
        req.data = data;
        next();
    });
};

export default checkExistFindData;
