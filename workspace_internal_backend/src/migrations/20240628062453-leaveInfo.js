"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("leaveInfos", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      workingShift: {
        type: Sequelize.DataTypes.ENUM("Holiday","Weekend","Full Day","Half Day"),
        allowNull: false,
      },
      leaveId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
        references: {
          model: "leaveRequests",
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("leaveInfos");
  },
};
