'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('assets', 'deletedAt');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('assets', 'deletedAt', {
      allowNull: true,
      type: Sequelize.DataTypes.DATE
    });
  }
};
