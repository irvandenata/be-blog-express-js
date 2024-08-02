import fs from "fs";
import { Op } from "sequelize";
import { Blog, Role, User } from "../models";
import AppError from "../utils/appError";
import {
    ProfileData,
    File,
    PasswordData,
    BlogFilter,
    BlogData,
    ReviewModel,
    UserFilter,
    UserInterface,
    UserModel,
} from "../interfaces";

export default class UserService {
    constructor() {}

    /**
     * @function getUsers
     * @summary Retrieves a list of users
     * @param {UserFilter} query - The query parameters for filtering the users
     * @param {string} protocol - The protocol used in the request
     * @param {string} host - The host used in the request
     * @return {UserInterface[]} - An array of user objects
     */
    public getUsers = async (
        query: UserFilter,
        protocol: string,
        host: string
    ) => {
        const hostName = protocol + "://" + host;
        const { limit, offset } = this.paginate(query.page, query.limit);
        const sk = query.q ? query.q : "";
        return (
            await User.findAll({
                where: {
                    [Op.or]: [
                        {
                            firstName: {
                                [Op.iLike]: `%${sk}%`,
                            },
                        },
                        {
                            lastName: {
                                [Op.iLike]: `%${sk}%`,
                            },
                        },
                    ],
                },
                //include role data
                include: [
                    {
                        model: Role,
                        required: true,
                        attributes: ["name"],
                        as: "role",
                    },
                ],
                attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "profileImage",
                ],
                limit,
                offset,
            })
        ).map((user: any) => {
            user.profile_image = user.profile_image
                ? hostName + "/" + user.profile_image
                : null;
            return user;
        });
    };

    /**
     * @function createUser
     * @summary Creates a new user
     * @param {string} protocol - The protocol used in the request
     * @param {string} host - The host used in the request
     * @param {UserModel} data - The user data to be created
     * @param {File} file - The file to be uploaded
     * @return {string} host - The host used in the request
     */
    public createUser = async (
        protocol: string,
        host: string,
        data: UserModel,
        file?: File
    ) => {
        const hostName = protocol + "://" + host;
        let profileImage: string = "";
        if (file) {
            profileImage = file.path!;
        }
        const result: UserModel = await User.create(
            { profile_image: profileImage, ...data },
            {
                returning: true,
            }
        );
        return {
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            profileImage: result.profileImage,
            role: result.role,
        };
    };

    /**
     * @function getUserById
     * @summary Retrieves a user by id
     * @param {string} id - The id of the user to be retrieved
     * @return {UserInterface} - A user object
     */
    public getUserById = async (id: string) => {
        const result = await User.findByPk(id, {
            attributes: [
                "id",
                "firstName",
                "lastName",
                "email",
                "profileImage",
            ],
            include: [
                {
                    model: Role,
                    required: true,
                    attributes: ["name"],
                    as: "role",
                },
            ],
        });
        if (!result) {
            throw new AppError(404, "User not found");
        }
        return result;
    };

    /**
     * @function updateUserById
     * @summary Updates a user by id
     * @param {string} userId - The id of the user to be updated
     * @param {string} protocol - The protocol used in the request
     * @param {string} host - The host used in the request
     * @param {UserModel} data - The user data to be updated
     * @param {File} file - The file to be uploaded
     * @throws {AppError} - If the passwords do not match
     * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
     */
    public updateUserById = async (
        userId: string,
        protocol: string,
        host: string,
        data: UserModel,
        file?: File
    ) => {
        const currentUser = await User.findByPk(userId);
        const hostName = protocol + "://" + host;
        let checkMatchingPassword: boolean =
            data.password === data.passwordConfirm;
        if (!checkMatchingPassword) {
            throw new AppError(400, "Passwords do not match");
        }

        let profileImage = "";
        if (file) {
            profileImage = file.path!;
            let oldPath: string = currentUser!.profileImage!;
            this.deleteFileIfExists(oldPath);
        }

        const newValues = { profileImage, ...data };
        Object.keys(newValues).forEach((key: string) => {
            if (!newValues[key as keyof ProfileData]) {
                delete newValues[key as keyof ProfileData];
            }
        });

        const user = await User.update(newValues, {
            where: { id: userId },
            returning: true,
        });

        if (user != null && user[0] === 0) {
            throw new AppError(404, "User not found");
        }

        const result = {
            id: user[1][0].id,
            firstName: user[1][0].firstName,
            lastName: user[1][0].lastName,
            email: user[1][0].email,
            profileImage: hostName + "/" + user[1][0].profileImage,
        };
        return result;
    };

    /**
     * @function deleteUserById
     * @summary Deletes a user by id
     * @param {string} userId - The id of the user to be deleted
     * @throws {AppError} - If the user is not found
     * @return {string} - A string indicating that the user has been deleted
     */
    public deleteUserById = async (userId: string) => {
        User.destroy({
            where: {
                id: userId,
            },
        }).catch((err) => {
            throw new AppError(400, "User not found");
        });

        return { message: "User deleted" };
    };

    /**
     * @function deleteFileIfExists
     * @summary Deletes a file if it exists
     * @param {string} path - The path of the file to be deleted
     * @return {void}
     */
    private deleteFileIfExists = (path: string | "") => {
        if (path) {
            fs.access(path, function (err: any) {
                if (!err) {
                    fs.unlink(path, (e) => {});
                }
            });
        }
        return;
    };

    /**
     * @function paginate
     * @summary Paginates the data
     * @param {number} clientPage - The page number
     * @param {number} clientLimit - The limit of data to be displayed
     * @param {number} maxLimit - The maximum limit of data to be displayed
     * @return {number} clientLimit - The limit of data to be displayed
     */
    private paginate = (
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

    /**
     * @function isPropertyNaN
     * @summary Checks if a property is NaN
     * @param {any} prop - The property to be checked
     * @param {string} name - The name of the property
     * @throws {AppError} - If the property is NaN
     * @return {void}
     */
    private isPropertyNaN = (prop: any, name: string) => {
        if (isNaN(prop)) throw new AppError(400, `Invalid ${name} id`);
        return;
    };
}
