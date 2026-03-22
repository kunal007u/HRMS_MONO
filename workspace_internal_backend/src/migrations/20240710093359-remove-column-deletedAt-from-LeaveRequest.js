'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('leaveRequests', 'deletedAt');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('leaveRequests', 'deletedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
  }
};
