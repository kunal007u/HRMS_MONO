"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryInterface.createTable("experienceDetails", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
      },
      companyName: { type: Sequelize.DataTypes.STRING, allowNull: false },
      designation: { type: Sequelize.DataTypes.STRING, allowNull: false },
      location: { type: Sequelize.DataTypes.STRING, allowNull: false },
      periodFrom: { type: Sequelize.DataTypes.DATEONLY, allowNull: false },
      periodTo: { type: Sequelize.DataTypes.DATEONLY, allowNull: false },
      experienceId: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("experienceDetails");
  },
};
