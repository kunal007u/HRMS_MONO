"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("leaveRequests", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      startDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      halfLeaveDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: true,
      },
      numberOfDays: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      reason: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      approvedBy: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
      },
      status: {
        type: Sequelize.DataTypes.ENUM("pending", "approved", "rejected", "cancelled"),
        defaultValue: "pending",
        allowNull: false,
      },
      remark: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      balance: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
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
      deletedAt: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("leaveRequests");
  },
};
