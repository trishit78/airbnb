import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(`
      alter table hotels
      add column rating decimal(3,2) default null,
      add column rating_count int default null
      `);
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.sequelize.query(`
      alter table hotels
      drop column ratings,
      drop column rating_count
      `)
  }
};
