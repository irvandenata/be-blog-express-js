import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

interface RoleModel
    extends Model<
        InferAttributes<RoleModel>,
        InferCreationAttributes<RoleModel>
    > {
    id: number;
    name: "user" | "author" | "admin";
}

export { RoleModel };



