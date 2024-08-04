import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import AppError from "../utils/appError";
import { UserModel } from "../interfaces";
import db from "./connection";
import { v4 as uuidv4 } from "uuid";
import { camelCase, snakeCase } from "lodash";
import { generateUrlImage } from "../utils/helpers";
const User = db.define<UserModel>(
    "user",
    {
        id: {
            type: DataTypes.UUIDV4,
            autoIncrement: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "First name is required",
                },
                len: {
                    args: [1, 50],
                    msg: "First name must be between 1 and 50 characters",
                },
            },
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Last name is required",
                },
                len: {
                    args: [1, 50],
                    msg: "Last name must be between 1 and 50 characters",
                },
            },
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                name: "email",
                msg: "Email address already in use!",
            },
            validate: {
                isEmail: {
                    msg: "Please enter a valid email address",
                },
            },
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Password is required",
                },
            },
        },
        passwordConfirm: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Password Confirm is required",
                },
                doPasswordsMatch: function (value: string) {
                    if (value !== this.password) {
                        throw new AppError(400, "Password fields don't match!");
                    }
                },
            },
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        profileImage: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        refreshToken: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        hooks: {
            afterFind: (results: UserModel, options) => {
                if (Array.isArray(results)) {
                    results.forEach((result) => {
                        result.profileImage = result?.profileImage
                            ? generateUrlImage(result.profileImage)
                            : "";
                    });
                }
            },
            beforeCreate: async (user: UserModel, options) => {
                user.email = user.email.toLowerCase();
                // validate duplicate email
                let error: any = null;
                await User.findOne({ where: { email: user.email } }).then(
                    (existingUser) => {
                        if (existingUser && existingUser.email === user.email) {
                            error = new AppError(
                                400,
                                ": Email address already in use!"
                            );
                        }
                    }
                );
                if (error) {
                    throw error;
                }
                user.id = uuidv4();
                user.roleId = 2;
                user.password = bcrypt.hashSync(user.password, +hashRounds);
            },
            beforeUpdate: (user: any, options) => {
                const newValues: object = {};
                if (user.changed("password")) {
                    user.password = bcrypt.hashSync(user.password, +hashRounds);
                }
                Object.keys(user.dataValues).forEach((key) => {
                    newValues[snakeCase(key)] = user.dataValues[key];
                });

                user.dataValues = newValues;
            },
            afterUpdate: (user: any, options) => {
                console.log("after update");
                const newValues: object = {};
                Object.keys(user.dataValues).forEach((key) => {
                    newValues[camelCase(key)] = user.dataValues[key];
                });
                user.dataValues = newValues;
                user.profileImage = user.profileImage
                    ? generateUrlImage(user.profileImage)
                    : "";
            },
            afterCreate: async (user: UserModel, options) => {
                try {
                    user.passwordConfirm = "confirmed";
                    await user.save({ validate: false });

                    user.profileImage = user.profileImage
                        ? generateUrlImage(user.profileImage)
                        : "";
                } catch (err: any) {
                    throw new AppError(
                        500,
                        err.message,
                        false,
                        err.name,
                        err.stack
                    );
                }
            },
            beforeDestroy: async (user: UserModel, options) => {
                console.log("before destroy");
                if (user?.profileImage) {
                    const oldPath = `public/uploads/${user.profileImage}`;
                    const fs = require("fs");
                    fs.unlink(oldPath, (err: any) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                }
            },
        },
    }
);

const hashRounds: any = process.env.PASSWORD_HASH_CYCLE || 10;


export default User;
