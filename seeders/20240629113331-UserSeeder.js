'use strict';

const bcrypt = require('bcrypt');
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

        await queryInterface.bulkInsert('users',[
            {
                id: 'f7b3b2b1-5b7b-4b3b-8b3b-7b3b2b1b3b2a',
                role_id: 1,
                first_name: 'Admin',
                last_name: 'Irvan',
                email: 'admin@mail.com',
                password: bcrypt.hashSync('admin123',10),
                password_confirm: bcrypt.hashSync('admin123',10),
                is_verified: true,
                profile_image: 'admin.jpg',
                refresh_token: null,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 'f7b3b2b1-5b7b-4b3b-8b3b-7b3b2b1b3baa',
                role_id: 1,
                first_name: 'irvan',
                last_name: 'Irvan',
                email: 'irvandta@gmail.com',
                password: bcrypt.hashSync('password',10),
                password_confirm: bcrypt.hashSync('password',10),
                is_verified: true,
                profile_image: 'admin.jpg',
                refresh_token: null,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 'f7b3b2b1-5b7b-4b3b-8b3b-7b3b2b1b1baa',
                role_id: 2,
                first_name: 'User',
                last_name: 'Irvan',
                email: 'user@mail.com',
                password: bcrypt.hashSync('user123',10),
                password_confirm: bcrypt.hashSync('user123',10),
                is_verified: true,
                profile_image: 'user.jpg',
                refresh_token: null,
                created_at: new Date(),
                updated_at: new Date()
            }]);
    },

    async down(queryInterface,Sequelize)
    {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('users',null,{});
    }
};
