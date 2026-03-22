"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryInterface.createTable("employeeDocuments", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
      },
      tenMarksheet: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      twelveMarksheet: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      degreeMarksheet: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      adharCard: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      panCard: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      salarySlip1: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      salarySlip2: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      salarySlip3: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      probationComplitionLetter: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      appointmentLetter: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      employeeId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
        references: {
          model: "employees",
          key: "id",
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("employeeDocuments");
  },
};
