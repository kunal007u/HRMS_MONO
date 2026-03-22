module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn("employees", "otp", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("employees", "otpExpiry", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("employees", "otp");
    await queryInterface.removeColumn("employees", "otpExpiry");
  },
};
