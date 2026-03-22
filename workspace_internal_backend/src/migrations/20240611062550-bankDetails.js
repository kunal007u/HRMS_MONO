'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bankDetails', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      employeeId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "employees",
          key: "id",
        }
      },
      bankName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      accountNo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      IFSC: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      branchName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
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
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bankDetails");
  }
};
