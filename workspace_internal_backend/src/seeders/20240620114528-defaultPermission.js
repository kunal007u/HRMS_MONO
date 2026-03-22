const { Role, Route } = require("../models/associations");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [routes, roles] = await Promise.all([
      Route.findAll({ attributes: ["id"],logging: false }),
      Role.findAll({ attributes: ["id", "name"],logging: false }),
    ]);

    const permissions = [];
    for (const role of roles) {
      for (const route of routes) {
        const permission = {
          canCreate: false,
          canRead: false,
          canUpdate: false,
          canDelete: false,
          roleId: role.id,
          routeId: route.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        if (role.name === "SUPER ADMIN") {
          permission.canCreate = true;
          permission.canRead = true;
          permission.canUpdate = true;
          permission.canDelete = true;
        }
        permissions.push(permission);
      }
    }
    await queryInterface.bulkInsert("permissions", permissions, { logging: false });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("permissions", null, { logging: false });
  },
};