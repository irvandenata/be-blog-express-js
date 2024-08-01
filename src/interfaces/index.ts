import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

// db interfaces
export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    email: string;
    password: string;
    passwordConfirm: string;
    isVerified?: boolean;
    memberStatus?: "active" | "passive";
    profileImage?: string;
    profile_image?: string;
    refreshToken?: string;
    roleId?: number;
    createdAt?: string;
    updatedAt?: string;
    oldImage?: string;
    role?: {
        id?: number;
        name?: string;
        code?: string;
    }
}
export interface RoleModel extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>> {
    id: number;
    name: "user" | "author" | "admin";
}
export interface ReviewModel extends Model<InferAttributes<ReviewModel>, InferCreationAttributes<ReviewModel>> {
    id?: number;
    content: string;
    verifyStatus?: "verified" | "pending" | "rejected";
    feedback?: string;
    response?: "positive" | "negative";
    ownerId?: number;
    blogId?: number;
}
export interface CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
    name: string;
    keywords: string;
    categoryStatus: "active" | "passive";
}
export interface BlogModel extends Model<InferAttributes<BlogModel>, InferCreationAttributes<BlogModel>> {
    id?: number;
    title: string;
    slug?: string;
    keywords?: string;
    summary?: string;
    content: string;
    image?: string;
    blogStatus?: "active" | "passive";
    length?: number;
    clapCount?: number;
    authorId?: string;
    categoryId?: number;
}
// other interfaces
export interface EmailRequest {
    from: {
        email: string
    },
    reply_to: {
        email: string
    },
    personalizations: [
        {
            to: [{ email: string }],
            dynamic_template_data:
            {
                name: string,
                verificationUrl?: string
            }
        }
    ],
    template_id?: string
}
export interface JwtSignInputs {
    data: {
        id: string | undefined;
        email?: string;
        role?: number;
    };
    secret: string;
    expiresIn: string;
}
export interface JwtVerifyInputs {
    token: string;
    secret: string;
}
export interface LoginData {
    email: string;
    password: string;
    remember?: boolean
}
export interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
    filepath?: string
}
export interface ProfileData {
    firstName: string;
    lastName: string;
    bio: string;
    oldImage: string;
    profileImage?: string;
}
export interface PasswordData {
    oldPassword: string;
    password: string;
    passwordConfirm: string;
}
export interface BlogFilter {
    page?: number;
    limit?: number;
    q?: string;
}


export interface UserFilter{
    page?: number;
    limit?: number;
    q?: string;
}
export interface BlogData {
    id?: number
    title: string;
    keywords: string;
    summary?: string;
    content: string;
    oldImage?: string;
    image?: string;
    categoryId: number
}

export interface UserInterface {
    id: string,
    firstName: string,
    lastName: string,
    role: string,
    email: string
    profileImage?: string
}