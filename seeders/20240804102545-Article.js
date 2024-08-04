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


    await queryInterface.bulkInsert('articles',[
      {
        title:'Article 1',
        subtitle:'Sub Title 1',
        slug:'article-1',
        article_category_id: 1,
        created_by:"f7b3b2b1-5b7b-4b3b-8b3b-7b3b2b1b3b2a",
        updated_by:"f7b3b2b1-5b7b-4b3b-8b3b-7b3b2b1b3b2a",
        content:'Content 1',
        status:'published',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])

    await queryInterface.bulkInsert('article_has_article_tags',[
      {
        article_id:1,
        article_tag_id:1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        article_id:1,
        article_tag_id:2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
      

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('articles',null,{})
  }
};
