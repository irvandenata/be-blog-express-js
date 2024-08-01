import AppError from "../utils/appError";
import Cookie from "../utils/cookie";
import Email from "../utils/email";
import JWT from "../utils/jwt";
import { UserModel, LoginData } from "../interfaces";
import { API_URL } from "../config";
import { User, Role } from "../models";
import { Validation } from "../validations/validation";
import { UserValidation } from "../validations/userValidation";
import bcrypt from "bcrypt";

export default class AuthService {
    constructor() {}

    /**
     * Below is the registerUser method that will be used to register a new user.
     * @summary Function to register a new user.
     * @param {String} firstName - The first name of the user.
     * @param {String} lastName - The last name of the user.
     * @param {String} email - The email of the user.
     * @param {String} password - The password of the user.
     * @param {String} passwordConfirm - The password confirmation of the user.
     * @return {Object} The user object.
     */
    public registerUser = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        passwordConfirm: string
    ) => {
        // create the user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            passwordConfirm,
            isVerified: true,
        });

        // sign a jwt token
        const data = { id: newUser.id };
        const secret = process.env.JWT_VERIFY_SECRET as string;
        const expiresIn = process.env.JWT_VERIFY_EXPIRY as string;
        const token = await JWT.sign({ data, secret, expiresIn });
        // send a verification email
        // const verificationUrl = `${API_URL}/api/${process.env.API_VERSION}/auth/verify/${token}`;
        // if (process.env.NODE_ENV === "production") {
        // await new Email(newUser, { verificationUrl }).sendEmailVerification();
        // } else {
        //     console.log(token)
        // }
        // return limited user info
        return {
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            createdAt: newUser.createdAt,
        };
    };

    /**
     * Below is the verifyUserAndCreateSession method that will be used to verify a user and create a session.
     * @summary Function to verify a user and create a session.
     * @param {String} token - The token of the user.
     * @return {Object} The session cookie and session expiry.
     */
    public verifyUserAndCreateSession = async (token: string) => {
        // verify token & extract user data
        const decoded = await JWT.verify({
            token,
            secret: process.env.JWT_VERIFY_SECRET as string,
        });
        // fetch user from db
        const user = await User.findOne({
            where: {
                id: decoded.id,
            },
            attributes: ["id", "isVerified"],
            include: [Role],
        });
        if (!user) {
            throw new AppError(400, "User not found");
        }
        if (user.isVerified) {
            throw new AppError(400, "User already verified");
        }
        // verify and login the user only if the user is not verified
        user.isVerified = true;
        user.memberStatus = "active";
        await user.save({ fields: ["isVerified", "memberStatus"] });
        // sign a session token and embed it in the cookie
        const { sessionCookie, sessionExpiry } = await this.createSession(user);
        return { sessionCookie, sessionExpiry };
    };

    /**
     * Below is the loginUserAndCreateSession method that will be used to login a user and create a session.
     * @summary Function to login a user and create a session.
     * @param {Object} data - The data of the user.
     * @return {Object} The session cookie and session expiry.
     */
    async loginUserAndCreateSession(data: LoginData) {
        // validate email and password
        Validation.validate(UserValidation.LOGIN, data);
        const { email, password, remember } = data;
        // check if email and password exist
        if (!email || !password) {
            throw new AppError(400, "Please provide email and password");
        }
        // check if user exists
        const user = await User.findOne({
            where: { email },
            attributes: ["id", "password", "isVerified"],
            include: [
                {
                    model: Role,
                    as: "role",
                },
            ],
        });

        if (!user) {
            throw new AppError(400, "Incorrect email or password");
        }
        if (user.memberStatus === "passive") {
            throw new AppError(400, "Incorrect email or password");
        }
        // check if password is correct
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            throw new AppError(400, "Incorrect email or password");
        }
        // check if user is verified
        if (user.isVerified !== true) {
            throw new AppError(401, "Please verify your email first");
        }
        // sign a session token and embed it in the cookie
        const { sessionCookie, sessionExpiry } = await this.createSession(user);
        return { sessionCookie, sessionExpiry };
    }

    /**
     * Below is the checkUserSession method that will be used to check a user session.
     * @summary Function to check a user session.
     * @param {String} cookie - The cookie of the user.
     * @return {Object} The session cookie and session expiry.
     */
    public checkUserSession = async (cookie: string) => {
        if (!cookie) {
            throw new AppError(401, "Unauthorized");
        }
        // decrypt token from session and verify
        const token = Cookie.decrypt(cookie);
        const decoded = await JWT.verify({
            token,
            secret: process.env.JWT_SESSION_SECRET as string,
        });

        // fetch user from db
        const user = await User.findOne({
            where: {
                id: decoded.id,
            },
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
                    as: "role",
                    attributes: ["id", "name"],
                },
            ],
        });

        // check if user still exists
        if (!user) {
            throw new AppError(401, "The user no longer exists!");
        }

        const userData = {
            id: user.id!,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role!.name!,
            email: user.email,
            profileImage: user.profileImage,
        };
        return userData;
    };

    /**
     * Below is the createSession method that will be used to create a session.
     * @summary Function to create a session.
     * @param {UserModel} user - The user object.
     * @return {Object} The session cookie and session expiry.
     */
    private createSession = async (user: UserModel) => {
        const data = { id: user.id, role: user.role!.id };
        const secret = process.env.JWT_SESSION_SECRET as string;
        const expiresIn = process.env.JWT_SESSION_EXPIRY as string;
        const sessionToken = await JWT.sign({ data, secret, expiresIn });
        const sessionCookie = await new Cookie().encrypt(sessionToken);
        // create a cookie expiry date in compatible w jwt lifetime
        const sessionExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000 * +15);
        return { sessionCookie, sessionExpiry };
    };

    /**
     * Below is the forgotPassword method that will be used to logout a user.
     * @summary Function to logout a user.
     * @param {String} email - The email of the user.
     * @return {Object} The user object.
     */
    public sendForgotPasswordMail = async (email: string) => {
        const user: UserModel | null = await User.findOne({
            where: { email },
            attributes: ["id", "firstName", "lastName", "email"],
        });

        if (!user) {
            throw new AppError(404, "User not found");
        }
        // sign a jwt token
        const data = { id: user.id };
        const secret = process.env.JWT_VERIFY_SECRET as string;
        const expiresIn = process.env.JWT_VERIFY_EXPIRY as string;
        const token = await JWT.sign({ data, secret, expiresIn });
        // send a verification email
        const verificationUrl = `${API_URL}/api/${process.env.API_VERSION}/auth/verify/${token}`;
        await new Email(user, { verificationUrl }).sendPasswordReset();
    };



    /**
     * Below is the changePassword method that will be used to change a user's password.
     * @summary Function to change a user's password.
     * @param {Object} data - The data of the user.
     * @return {Object} The user object.
     */

    public changePassword = async (data: any) => {
        // validate password and passwordConfirm
        Validation.validate(UserValidation.FORGOT_PASSWORD, data);
        const { password, passwordConfirm, token } = data;


        // verify token & extract user data
        const decoded = await JWT.verify({
            token,
            secret: process.env.JWT_VERIFY_SECRET as string,
        });


        // fetch user from db
        const user = await User.findOne({
            where: {
                id: decoded.id!,
            },
            attributes: ["id"],
        });

        if (!user) {
            throw new AppError(400, "User not found");
        }

        // change password
        user.password = password;
        user.passwordConfirm = passwordConfirm;
        await user.save({ fields: ["password", "passwordConfirm"] });        
    };
}
