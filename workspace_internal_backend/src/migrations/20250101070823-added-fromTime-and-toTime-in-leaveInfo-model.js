'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('leaveInfos', 'fromTime', {
      type: Sequelize.DataTypes.TIME,
      allowNull: true,
    });
    await queryInterface.addColumn('leaveInfos', 'toTime', {
      type: Sequelize.DataTypes.TIME,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('leaveInfos', 'fromTime');
    await queryInterface.removeColumn('leaveInfos', 'toTime');
  }
};
