'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('employees', 'endingDate', 'probationEndDate');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('employees', 'probationEndDate', 'endingDate');
  }
};
