'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    await queryInterface.bulkInsert('article_categories',[
      {
        name:'Programming',
        slug:'programming',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:'Technology',
        slug:'technology',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:'Health',
        slug:'health',
        created_at: new Date(),
        updated_at: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('article_categories',null,{})
  }
};
