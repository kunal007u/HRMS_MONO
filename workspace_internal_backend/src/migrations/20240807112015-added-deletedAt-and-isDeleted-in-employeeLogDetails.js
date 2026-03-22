'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('EmployeeLogDetails', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('EmployeeLogDetails', 'isDeleted', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('EmployeeLogDetails', 'deletedAt');
    await queryInterface.removeColumn('EmployeeLogDetails', 'isDeleted');
  }
};
