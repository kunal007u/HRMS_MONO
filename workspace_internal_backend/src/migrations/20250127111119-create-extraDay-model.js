'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable("extraWorkingDays", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      extraDayDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      shiftedFromDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
   });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("extraWorkingDays");
  }
};
