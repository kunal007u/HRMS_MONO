"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("leaveBalances", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      employeeId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
        references: {
          model: "employees",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      balance: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      paidLeave: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      lossOfPay: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("leaveBalance");
  },
};
