"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("routes", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
      },
      parentRouteId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "routes",
          key: "id",
        },
      },
      childRouteId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "routes",
          key: "id",
        },
      },
      name: Sequelize.DataTypes.STRING,
      priority: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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
    await queryInterface.dropTable("routes");
  },
};
