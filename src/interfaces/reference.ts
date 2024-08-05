import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface ArticleCategoryData {
    name: string;
    slug: string;
}



// ReferenceFilter
export interface ReferenceFilter {
    page?: number;
    limit?: number;
    q?: string;
}


export interface ArticleCategoryModel
    extends Model<
        InferAttributes<ArticleCategoryModel>,
        InferCreationAttributes<ArticleCategoryModel>
    > {
    id: number;
    name: string;
    slug: string;
    image?: string;
}

// other interfaces
export interface EmailRequest {
    from: {
        email: string;
    };
    reply_to: {
        email: string;
    };
    personalizations: [
        {
            to: [{ email: string }];
            dynamic_template_data: {
                name: string;
                verificationUrl?: string;
            };
        }
    ];
    template_id?: string;
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
    remember?: boolean;
}
export interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
    path?: string;
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


export interface BlogModel
    extends Model<
        InferAttributes<BlogModel>,
        InferCreationAttributes<BlogModel>
    > {
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


export interface BlogFilter {
    page?: number;
    limit?: number;
    q?: string;
}

export interface BlogData {
    id?: number;
    title: string;
    keywords: string;
    summary?: string;
    content: string;
    oldImage?: string;
    image?: string;
    categoryId: number;
}