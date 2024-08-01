'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface,Sequelize)
    {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        await queryInterface.createTable('users',{
            id: {
                // uuid is a data type that is used for storing universally unique identifiers (UUID) in the database.
                type: Sequelize.UUID,
                primaryKey: true,
                autoIncrement: false
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id'
                }
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password_confirm: {
                type: Sequelize.STRING,
                allowNull: false
            },
            is_verified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            profile_image: {
                type: Sequelize.STRING,
                allowNull: true
            },
            refresh_token: {
                type: Sequelize.STRING,
                allowNull: true
            },

            //timestamps    
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now')
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now')
            }
        });
    },

    async down(queryInterface,Sequelize)
    {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('users');
    }
};
