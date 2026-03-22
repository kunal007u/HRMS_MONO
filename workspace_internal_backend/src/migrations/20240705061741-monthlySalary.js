'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('monthlySalary', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      employeeId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "employees",
          key: "id",
        }
      },
      month: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      year: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false

      },
      totalWorkingDays: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      leaveDays: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
      },
      presentDays: {
        type: Sequelize.DataTypes.FLOAT
      },
      totalSalary: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
      },
      paidSalary: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true
      },
      salaryPaidAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      },
      deletedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      }

    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("monthlySalary");
  }
};
