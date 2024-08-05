import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

interface UserModel
    extends Model<
        InferAttributes<UserModel>,
        InferCreationAttributes<UserModel>
    > {
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
    refreshToken?: string;
    roleId?: number;
    createdAt?: string;
    updatedAt?: string;
    oldImage?: string;
    role?: {
        id?: number;
        name?: string;
        code?: string;
    };
}



interface UserFilter {
    page?: number;
    limit?: number;
    q?: string;
}

interface UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    profileImage?: string;
}

export { UserModel, UserFilter, UserInterface };

