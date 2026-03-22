'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('employees', 'state');
    await queryInterface.removeColumn('employees', 'pincode');
    await queryInterface.removeColumn('employees', 'city');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('employees', 'state', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('employees', 'pincode', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('employees', 'city', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true
    });
  }
};
