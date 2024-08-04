import fs from "fs";

/**
 * @function paginate
 * @summary Paginates the data
 * @param {number} clientPage - The page number
 * @param {number} clientLimit - The limit of data to be displayed
 * @param {number} maxLimit - The maximum limit of data to be displayed
 * @return {number} clientLimit - The limit of data to be displayed
 * @return {number} offset - The offset of the data to be displayed
 * @return {number} limit - The limit of data to be displayed
 * @return {number} offset - The offset of the data to be displayed
 */
export const paginate = (
    clientPage: number = 1,
    clientLimit: number = 10,
    maxLimit: number = 100
) => {
    let limit = +clientLimit < +maxLimit ? clientLimit : +maxLimit;
    let offset = (+clientPage - 1) * +limit;
    return { limit, offset };
};

/**
 * @function responseFormatter
 * @summary Formats the response data
 * @param {any} data - the data to be formatted
 * @param {string} type - the type of data to be formatted (e.g. fetch, single)
 * @return {any} - the formatted data
 */
export const responseFormatter: Function = (status: string, data: any, type: string) => {
    let result = {};
    if (type === "fetch") {
        result = {
            status,
            meta: {
                page: +data.page,
                limit: +data.limit,
                totalData: data.totalData,
                totalPages: data.totalPages,
            },
            data: data.rows,
        };
    } else {
        result = {
            status,
            data,
        };
    }
    return result;
};



/**
 * @function generateUrlImage
 * @summary Generates a URL for an image
 * @param {string} url - The URL of the image
 * @return {string} - The generated URL of the image
 */
export const generateUrlImage: Function = (url: string) => {
    return `${process.env.HOST_NAME}:${process.env.PORT}/storages/${url}`;
};




/**
 * @function deleteFileIfExists
 * @summary Deletes a file if it exists
 * @param {string} path - The path of the file to be deleted
 * @return {void}
 */
export const deleteFileIfExists: Function = (path: string | "") => {
    if (path) {
        fs.access(path, function (err: any) {
            if (!err) {
                fs.unlink(path, (e) => {});
            }
        });
    }
    return;
};
