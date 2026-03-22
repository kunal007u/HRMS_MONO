"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "departments",
      [
        {
          id: "95063a4f-2e21-44ab-9686-dce5c95778f1",
          name: "IT",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: "af312ff9-7d4d-4144-88f7-0a627d4f9ee5",
          name: "Finance",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: "ab766981-1997-4213-945d-f84802f09da5",
          name: "Marketing",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: "625ef4a8-427c-40af-9934-121ddb8d862c",
          name: "Sales",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          id: "91c1f9a3-b171-430f-b833-5a46a9334015",
          name: "Admin",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("departments", null, {});
  },
};
