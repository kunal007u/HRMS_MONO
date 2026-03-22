"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "designations",
      [
        {
          id: "f70e9f56-c4c6-44a6-b7fe-07a098e55336",
          name: "Manager",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "53932f4c-b409-4ab7-80d4-3b3ab6e6991c",
          name: "Assistant Manager",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: "c1302bf6-473e-4433-928b-6a09a0ebd24b",
          name: "Senior Executive",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          id: "855e2799-1866-427d-b288-2fe91f7c319f",
          name: "Executive",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("designations", null, {});
  },
};
