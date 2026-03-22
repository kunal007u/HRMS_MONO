"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("attendances", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
      },
      date: {
        type: Sequelize.DataTypes.DATEONLY,
      },
      employeeCode: {
        type: Sequelize.DataTypes.STRING,
      },
      employeeName: {
        type: Sequelize.DataTypes.STRING,
      },
      inTime: {
        type: Sequelize.DataTypes.TIME,
      },
      outTime: {
        type: Sequelize.DataTypes.TIME,
      },
      inDuration: {
        type: Sequelize.DataTypes.TIME,
      },
      outDuration: {
        type: Sequelize.DataTypes.TIME,
      },
      lateBy: {
        type: Sequelize.DataTypes.TIME,
      },
      earlyBy: {
        type: Sequelize.DataTypes.TIME,
      },
      status: {
        type: Sequelize.DataTypes.ENUM("Absent", "Present"),
        defaultValue: "Absent",
      },
      punchRecords: {
        type: Sequelize.DataTypes.STRING,
      },
      overtime: {
        type: Sequelize.DataTypes.TIME,
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
    await queryInterface.dropTable("attendances");
  },
};
