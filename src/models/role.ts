import { DataTypes } from 'sequelize';
import { RoleModel } from '../interfaces';
import db from './connection';

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