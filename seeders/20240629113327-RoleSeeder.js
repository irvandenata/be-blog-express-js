'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface,Sequelize)
    {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */
        await queryInterface.bulkDelete('users',null,{});

        await queryInterface.bulkInsert('roles',[
            {
                name: 'Admin'
            },
            {
                name: 'User'
            }
        ],{});

    },

    async down(queryInterface,Sequelize)
    {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('roles',null,{});
    }
};
