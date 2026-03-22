module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn("leaveRequests", "paidLeave", {
      type: Sequelize.DECIMAL(10, 1),
      defaultValue: 0.0,
      allowNull: false,
    });

    await queryInterface.addColumn("leaveRequests", "lossOfPay", {
      type: Sequelize.DECIMAL(10, 1),
      defaultValue: 0.0,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("leaveRequests", "paidLeave");

    await queryInterface.removeColumn("leaveRequests", "lossOfPay");
  },
};
