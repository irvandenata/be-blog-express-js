
import { Sequelize } from 'sequelize';
import logger from '../utils/logging';

const db = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST as string,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    port: process.env.DB_PORT as unknown as number,
    logging: (msg) => logger.info(msg),
    define: {
        underscored: true, // use snake_case for all fields in the database
        // freezeTableName: true, //stop the auto-pluralization performed by Sequelize
        timestamps: false // don't add timestamps to tables by default (createdAt, updatedAt)
    },
});

export default db;