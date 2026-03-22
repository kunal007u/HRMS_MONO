'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('projects', 'name', 'projectName', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('projects', 'projectManager', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('projects', 'endDate', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('projects', 'startDate', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('projects', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('projects', 'isActive', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    })
  },

  async down(queryInterface, Sequelize) {
  }
};
