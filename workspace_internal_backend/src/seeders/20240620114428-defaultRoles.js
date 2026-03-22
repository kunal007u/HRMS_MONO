module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id:"6e5f9a85-db29-4960-bba9-74a334fb3731",
          name: "SUPER ADMIN",
          isActive: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("employees", null, {});
  },
};
