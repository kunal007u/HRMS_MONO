'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('workLogs', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      employeeId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "employees",
          key: "id"
        },
        onDelete: "CASCADE",
      },
      projectId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "projects",
          key: "id"
        },
        onDelete: "CASCADE",
      },
      workHour: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('workLogs')
  }
};
