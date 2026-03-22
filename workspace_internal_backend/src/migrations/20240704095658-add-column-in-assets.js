module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn("assets", "quantity", {
      type: Sequelize.INTEGER,
      defaultValue:0,
      allowNull: false,
    });

    await queryInterface.addColumn("assets", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("assets", "quantity");

    await queryInterface.removeColumn("assets", "description");
  },
};
