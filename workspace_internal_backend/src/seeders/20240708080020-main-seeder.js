'use strict';

const routeSeeder = require("./20240620114457-defaultRoutes");
const permissionSeeder = require("./20240620114528-defaultPermission");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('routes', null, {});

    await routeSeeder.up(queryInterface, Sequelize);
    await permissionSeeder.up(queryInterface, Sequelize);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', null, {});
    await queryInterface.bulkInsert('routes', null, {});

    await routeSeeder.down(queryInterface, Sequelize);
    await permissionSeeder.down(queryInterface, Sequelize);
  }
};