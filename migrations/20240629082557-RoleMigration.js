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

        //use column name snake case
        
       
        await queryInterface.createTable('roles',{
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
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
        await queryInterface.sequelize.query('ALTER SEQUENCE roles_id_seq RESTART WITH 1;');
        await queryInterface.dropTable('roles');
    }
};
