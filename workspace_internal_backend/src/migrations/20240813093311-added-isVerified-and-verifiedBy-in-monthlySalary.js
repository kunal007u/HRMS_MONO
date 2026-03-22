'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('monthlySalary', 'isVerified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
    });
    await queryInterface.addColumn('monthlySalary', 'verifiedBy', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('monthlySalary', 'isVerified');
    await queryInterface.removeColumn('monthlySalary', 'verifiedBy');
  }
};
