module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn("employeeDocuments", "passbook", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("employeeDocuments", "passbook");
  },
};
