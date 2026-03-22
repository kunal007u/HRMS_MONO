module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn("employees", "employeeType", {
      type: Sequelize.STRING,
      defaultValue:"Intern",
      allowNull: false,
    });

    await queryInterface.addColumn("employees", "endingDate", {
      type: Sequelize.DATEONLY,
      defaultValue: new Date().toISOString().split('T')[0],
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("employees", "employeeType");

    await queryInterface.removeColumn("employees", "endingDate");
  },
};
