'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('salary', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      employeeId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "employees",
          key: "id",
        }
      },
      basic: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
      },
      milestone: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 0
      },
      bonus: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 0
      },
      PF: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 200
      },
      PT: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 0
      },
      totalSalary: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
      },
      fromDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      toDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      isActive: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("salary");
  }
};
