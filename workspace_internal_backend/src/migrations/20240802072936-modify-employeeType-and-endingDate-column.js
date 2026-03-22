module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("employees", "employeeType", {
      type: Sequelize.STRING,
      defaultValue: "intern",
      allowNull: false,
    });

    await queryInterface.changeColumn("employees", "endingDate", {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("employees", "employeeType", {
      type: Sequelize.STRING,
      defaultValue: "Intern",
      allowNull: false,
    });

    await queryInterface.changeColumn("employees", "endingDate", {
      type: Sequelize.DATEONLY,
      defaultValue: new Date().toISOString().split('T')[0],
      allowNull: true,
    });
  },
};
