import { DataTypes } from 'sequelize';
import db from ".";
import { RoleModel } from '../interfaces';

const Role = db.define<RoleModel>('role',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.ENUM('user', 'author', 'admin'),
            allowNull: false,
        }
    }
);

export default Role;