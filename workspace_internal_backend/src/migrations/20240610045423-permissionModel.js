"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("permissions", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
      },
      canCreate: {
        type: Sequelize.DataTypes.BOOLEAN,
      },
      canRead: {
        type: Sequelize.DataTypes.BOOLEAN,
      },
      canUpdate: {
        type: Sequelize.DataTypes.BOOLEAN,
      },
      canDelete: {
        type: Sequelize.DataTypes.BOOLEAN,
      },
      roleId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "roles",
          key: "id",
        },
      },
      routeId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "routes",
          key: "id",
        },
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

    await queryInterface.addConstraint('permissions', {
      fields: ['roleId', 'routeId'],
      type: 'unique',
      name: 'unique_role_route'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('permissions', 'unique_role_route');
    await queryInterface.dropTable("permissions")
  },
};