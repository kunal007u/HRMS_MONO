'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "projects",
      "projectManager"
    );
    await queryInterface.addColumn('projects', 'projectManager', {
      type: Sequelize.UUID,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      "projects",
      "projectManager"
    );
    await queryInterface.removeColumn('projects', 'projectManager', {
      type: Sequelize.UUID,
      allowNull: true,
    });
  }
};
