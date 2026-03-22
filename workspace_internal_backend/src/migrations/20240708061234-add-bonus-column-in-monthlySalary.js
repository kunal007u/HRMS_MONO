'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('monthlySalary', 'bonus', {
      type: Sequelize.DataTypes.FLOAT,
      defaultValue: 0
    });
    await queryInterface.removeColumn('salary', 'bonus', {
      bonus: {
        type: Sequelize.DataTypes.FLOAT,
        defaultValue: 0
      },
    });
  },

  async down(queryInterface, Sequelize) {
  }
};
