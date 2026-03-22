'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('leaveRequests', 'leaveType', {
      type: Sequelize.ENUM('Casual Leave', 'Sick Leave', 'Privilege Leave'),
      allowNull: false,
      defaultValue: 'Casual Leave',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('leaveRequests', 'leaveType');
  }
};
