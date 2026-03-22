'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('experienceDetails', 'periodTo', {
      type: Sequelize.DATEONLY,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('experienceDetails', 'periodTo', {
      type: Sequelize.DATEONLY,
      allowNull: false
    })
  }
};
