module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("leaveBalances", "balance", {
      type: Sequelize.DECIMAL(10, 1),
      allowNull: false,
    });

    await queryInterface.changeColumn("leaveBalances", "paidLeave", {
      type: Sequelize.DECIMAL(10, 1),
      allowNull: false,
    });

    await queryInterface.changeColumn("leaveBalances", "lossOfPay", {
      type: Sequelize.DECIMAL(10, 1),
      allowNull: false,
    });

    await queryInterface.changeColumn("leaveRequests", "numberOfDays", {
      type: Sequelize.DECIMAL(10, 1),
      allowNull: false,
    });

    await queryInterface.changeColumn("leaveRequests", "balance", {
      type: Sequelize.DECIMAL(10, 1),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("leaveBalances", "balance", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn("leaveBalances", "paidLeave", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn("leaveBalances", "lossOfPay", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn("leaveRequests", "numberOfDays", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn("leaveRequests", "balance", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
