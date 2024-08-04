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


    await queryInterface.bulkInsert('article_tags',[
      {
        name:'laravel',
        slug:'laravel',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:'nodejs',
        slug:'nodejs',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name:'reactjs',
        slug:'reactjs',
        created_at: new Date(),
        updated_at: new Date
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

    await queryInterface.bulkDelete('article_tags',null,{})
  }
};
